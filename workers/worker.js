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
	var	kue = require('kue'),
	jobs = kue.createQueue();

	var mongoose = require('mongoose')
	mongoose.connect(config.database.url);
	var ScreenedUser = require('../models/screenedUser.js');


	jobs.process('renderPDF', function (job, done){
		//console.log('cluster: '+cluster.worker.id + ' got job' + job.type);
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

	//process sendMail jobs
	jobs.process('sendMail', function (job, done){
		console.log('cluster: '+cluster.worker.id + ' got job' + job.type);

		//send email with pdf download link in an email
		console.log('creating mail for ' + job.data.email);
		done && done();
	});
}


// //queue graceful shutdown
process.once( 'SIGINT', function ( sig ) {
  jobs.shutdown(function(err) {
		console.log( 'Kue is shut down.', err||'' );
		process.exit( 0 );
  }, 5000 );
});