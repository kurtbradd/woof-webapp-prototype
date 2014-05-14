var phantom = require('phantom');
var webshot = require('webshot');

// var session;
// phantom.create(function (cb_session) {
// 	session = cb_session;
// 	console.log('session created');
// });

renderPrescreenProfile();

function renderPrescreenProfile (userID, cb) {

var options = {
	  screenSize: {
	    width: 900,
	    height: 900
	  }, 
	  shotSize: {
	    width: 'all',
	    height: 'all'
	  }
	}
	url = "http://google.com";
	webshot(url, 'flickr.pdf', options, function(err) {
  	console.log(err);
	});	
}


// exports.renderPrescreenProfile = function (userID, cb) {
// 	console.log('renderPDF got job for id ' + userID);
// 	session.createPage(function (page, err) {
// 		if (err) {
// 			return cb('createpage error');
// 		}
// 		page.set('paperSize', {format:'A4'});
// 		url = 'http:localhost:3000/api/prescreen-profile/render/' + userID;
// 		pathToSave = 'userID' + '.pdf';
// 		page.open(url, function (status) {
// 			if (status === "success") {
// 				page.render(pathToSave, function() {
// 					console.log("renderd");
// 					cb(false, pathToSave);
// 				});
// 			} else {
// 				cb('cant open page error');
// 			}
// 			page.close();
// 			//session.exit();
// 		});
// 	});
// };

process.once( 'SIGINT', function ( sig ) {
	console.log('SIGINT Recieved');
	// session.exit();
  process.exit( 0 );
});