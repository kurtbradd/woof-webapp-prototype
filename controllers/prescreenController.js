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
		res.send(200);
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
	ScreenedUser.findById(req.params.id, function (error, user ) {
		if (error) {
			console.log(error)
			res.send(400);
		} else {
			questions = user.questions;
			kids_answer = questions['what is your household environment like?'];
			kids_answer = kids_answer.replace('Kids: ', '');
			context = {
				previous_dog:questions['have you had a dog before?'],
				activities:questions['what activities are you most excited for?'],
				dog_size:questions['what dog size would you prefer?'],
				walking_time:questions['how much daily walking time is ideal?'],
				training_time:questions['how much time a day would like to spend training?'],
				grooming_time:questions['what are your weekly grooming preferences?'],
				alone_time:questions['what is the max time your dog would spend alone?'],
				yard_size:questions['what is your yard size?'],
				gender:questions['any prefered dog gender?'],
				kids:kids_answer,
				purchase_price:questions['what is your max purchasing price?'],
				monthly_price:questions['what is your ideal monthly budget?']
			}
			res.render('pre-screen-profile/index.ejs', context);
		}
	})
};