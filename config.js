var keys = require('./keys.js')

module.exports = {
	mailer: {
	service: "Gmail",
		auth: {
				user: "hello@wooflabs.com",
				pass: keys.gmail
		}
	},
	database: {
		url: 'mongodb://localhost:27017/woof-web'
	}
}