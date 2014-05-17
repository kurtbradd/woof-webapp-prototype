var prescreenController = require('./prescreenController.js');

exports = module.exports = function(app) {

	//PrescreenController
	app.post('/api/prescreen-profile/form', prescreenController.form);
	app.get('/api/prescreen-profile/render/:id', prescreenController.render);

	//Test server is up
	app.get('/test', function (req, res) {
		res.send('Working');
	});

	//Download Prescreen Form
	app.get('/pre-screen-profile/:filepath', function (req, res) {
		res.download('./workers/pre-screen-profile/' + req.params.filepath);
	});

	//Serve Prescreen Form
	app.get('/buyer-prescreen', function (req, res) {
		res.sendfile('./public/views/index.html');
	});

	//Server Homepage
	app.get('/', function (req, res){
		res.sendfile('./public/views/landing_page/index-app.html');
	})

	//Catchall
	app.get('*', function (req, res){
		res.redirect('/');
	});

}