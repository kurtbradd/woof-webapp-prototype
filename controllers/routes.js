var prescreenController = require('./prescreenController.js');

exports = module.exports = function(app) {

	//PrescreenController
	app.post('/api/prescreen-profile/form', prescreenController.form);
	app.get('/api/prescreen-profile/render/:id', prescreenController.render);

	//Test server is up
	app.get('/test', function (req, res) {
		res.send('Working');
	});

	//Serve Angular Application
	app.get('*', function (req, res) {
		res.sendfile('./public/views/index.html');
	});
}