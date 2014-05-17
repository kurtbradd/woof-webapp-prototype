var path           = require('path');
var emailTemplates = require('swig-email-templates');
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

exports.renderEmail = function (template, context, cb) {
	var options = {
		root: path.join(__dirname, "emailTemplates"),
	};
	emailTemplates(options, function(error, render) {	
		if (error) {
			cb(error)
			return;
		}
		render(template, context, function(error, html) {
			if (error) {
				cb(error)
				return; 
			}
			cb(null, html);
		});
	});
}