var nodeMailer = require('nodemailer');

//cb(error, response)
exports.sendMail = function (transportConfig, mailOptions, cb) {
	smtpTransport = nodeMailer.createTransport("SMTP", transportConfig);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			cb(error);
			return;
		}
		cb(null, response);
		smtpTransport.close(); // shut down the connection pool, no more messages
	});
}

exports.renderEmail = function () {
	
}