var kue = require('kue'),
	jobs = kue.createQueue();

kue.app.listen(3001);

jobs.promote(500);

exports.sendMail = sendMail = function sendMail (data) {
	console.log('new sendMail job');	
	var job = jobs.create('sendMail', data);
	job.delay(500);
	job.attempts(100);
	job
	.on('complete', function (){
		jobResponse(false, job);
	})
	.on('failed', function (){
		//job.state('inactive').save();
		jobResponse(true, job);
	})

	job.save();
};

exports.renderPDF = renderPDF = function renderPDF (data) {
	console.log('new renderPDF job');	
	var job = jobs.create('renderPDF', data);
	job.delay(1500);
	job.attempts(100);
	job
	.on('complete', function (){
		console.log('render job completed');
		//jobResponse(false, job);
		//start a mail job
		//sendMail will send a download link
		//sendMail(job.data);
	})
	.on('failed', function (){
		console.log('render job failed');
		//job.state('inactive').save();
		jobResponse(true, job);
	})

	job.save();
}

//remove successfully completed jobs from redis
jobs.on('job complete', function(id){
  	kue.Job.get(id, function(err, job){
		if (err)
			return;
    	job.remove(function(err){
    		if (err) throw err;
      		//console.log('removed completed job #%d', job.id);
    	});
  	});
});

function jobResponse (err, job) {
	var jobStatus = (err) ? 'failed' : 'finished';
	console.log(job.type + ' for ' + job.data.email + ' has ' + jobStatus);
};