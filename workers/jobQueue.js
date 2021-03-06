var kue = require('kue'),
	jobs = kue.createQueue();

kue.app.listen(3001);

jobs.promote(500);

exports.sendMail = sendMail = function sendMail (data) {
	console.log('new sendMail job');	
	var job = jobs.create('sendMail', data);
	job.delay(500);
	job.attempts(20);
	job
	.on('complete', function (){
		jobResponse(false, job);
	})
	.on('failed', function (){
		jobResponse(true, job);
	})

	job.save();
};

exports.renderPDF = renderPDF = function renderPDF (data) {
	console.log('new renderPDF job');	
	var job = jobs.create('renderPDF', data);
	job.delay(500);
	job.attempts(20);
	job
	.on('complete', function (){
		jobResponse(false, job);
		sendMail(job.data);
	})
	.on('failed', function (){
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
    		if (err) {
    			return;
    		}
      	console.log('removed completed job #%d', job.id);
    	});
  	});
});

function jobResponse (err, job) {
	var jobStatus = (err) ? 'failed' : 'finished';
	console.log(job.type + ' for ' + job.data.email + ' has ' + jobStatus);
};