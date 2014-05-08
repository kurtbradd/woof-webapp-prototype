var mongoose = require('mongoose'),
    ScreenedUser = mongoose.model('ScreenedUser'),
    jobQueue = require('../workers/jobQueue.js')

exports.form = function (req, res) {
	var questions = req.body
	var email = questions.email;
	delete questions.email;

	var user = new ScreenedUser;
	user.email = email;
	user.email_sent = false;
	user.pdf_created = false;
	user.questions = questions;

	//save to db
	user.save(function(err, user) {
		if (err) {
			return res.json(400, err);
		}
		res.send(201);
		//create job for worker
		var job = {
			id:user._id,
			email:user.email,
			questions:user.questions
		}
		jobQueue.renderPDF(job);
	});
};

exports.render = function (req, res) {
	//res.send('<h1>' + req.params.id +'</h1>');
	//res.sendfile('./public/views/pre-screen-profile/index.html');
	res.render('pre-screen-profile/index.ejs', {name:'kurt'});
};