var cluster = require('cluster')
var clusterWorkerSize = require('os').cpus().length;
var config = require('../config');

if (cluster.isMaster) {
	console.log('Master Worker PID: '+ process.pid);
	for (var i = 0; i < clusterWorkerSize; i++) {
		cluster.fork();
	}
}

else {

	console.log('Cluster Worker PID: '+ process.pid);
	var pdf = require('./renderPDF.js')
	var mailer = require('./mailer.js')
	var	kue = require('kue'),
	jobs = kue.createQueue();

	var mongoose = require('mongoose')
	mongoose.connect(config.database.url);
	var ScreenedUser = require('../models/screenedUser.js');

	// RENDER PDF JOB
	jobs.process('renderPDF',1, function (job, done){
		pdf.renderPrescreenProfile(job.data.id, function (err, filePath) {
			if (err) {
				done && done(err);
			} else {
				ScreenedUser.findById(job.data.id, function(err, user) {
					if (err) {
						done && done (err);
					} else {
						user.pdf_created = true;
						user.pdf_path = filePath;
						user.save(function(err, user) {
							if (err) {
								done && done(err);
							} else {
								done && done();
							}
						});
					}
				});
			}
		});
	});

	// SEND MAIL JOB
	jobs.process('sendMail',1, function (job, done){
		//console.log('cluster: '+cluster.worker.id + ' got job' + job.type);
		ScreenedUser.findById(job.data.id, function(err, user) {
			if (err) {
				done && done (err);
			} 
			else {
				context = {
					pdf_path:user.pdf_path
				}
				console.log(user.pdf_path);
				mailer.renderEmail('prescreenTemplate.html', context, function(error, html) {
					if (error) {
						done && done (error)
						return;
					}
					mailOptions = {
						from:'Dan @ Woof Labs <hello@wooflabs.com>',
						to:user.email,
						subject:'You Buyer Profile has arrived!',
						html:html
					};
					mailer.sendMail(config.mailer, mailOptions, function(error, response){
						if (error) {
							console.log('error sending email');
							done && done(error);
							return;
						}
						console.log('email sent');
						user.email_sent = true;
						user.save(function(err, user) {
							if (err) {
								console.log('failed to update user');
								done && done(err);
							} else {
								console.log('user model updated');
								done && done();
							}
						});
					})
				});
			}
		});
	});
}


// //queue graceful shutdown
process.once( 'SIGINT', function ( sig ) {
  jobs.shutdown(function(err) {
		console.log( 'Kue is shut down.', err||'' );
		process.exit( 0 );
  }, 5000 );
});