var cluster = require('cluster')

var clusterWorkerSize = require('os').cpus().length;
var pdf;

if (cluster.isMaster) {
	console.log('Master Worker PID: '+ process.pid);
	for (var i = 0; i < clusterWorkerSize; i++) {
		//fork worker processess
		cluster.fork();
	}
} else {
	console.log('Cluster Worker PID: '+ process.pid);
	//load pdf module in cluster worker
	pdf = require('./renderPDF.js')

	var	kue = require('kue'),
	jobs = kue.createQueue();

	//connect to mongodb
	var mongoose = require('mongoose')
	mongoose.connect('mongodb://localhost:27017/woof-web');
	var ScreenedUser = require('../models/screenedUser.js');

	//process renderPDF jobs
	jobs.process('renderPDF', function (job, done){
		console.log('cluster: '+cluster.worker.id + ' got job' + job.type);
		console.log('creating PDF for' + job.data.email);
		pdf.renderPrescreenProfile(job.data.id, function (err, filePath) {
			console.log('render returned and saving user db now');
			if (err) {
				console.log(err);
				return done && done(err);
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
// process.once( 'SIGINT', function ( sig ) {
//   jobs.shutdown(function(err) {
// 	console.log( 'Kue is shut down.', err||'' );
// 	process.exit( 0 );
//   }, 5000 );
// });