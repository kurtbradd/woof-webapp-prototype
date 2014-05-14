var webshot = require('webshot');

//cb(error, filepath)
exports.renderPrescreenProfile = function renderPrescreenProfile (userID, cb) {
var options = {
	  screenSize: {
	    width: 900,
	    height: 1000
	  }, 
	  shotSize: {
	    width: 'all',
	    height: 'all'
	  },
	  quality:100
	}

	url = 'http://localhost:3000/api/prescreen-profile/render/' + userID;
	date = new Date().getTime();
	filePath = '/pre-screen-profile/'+ userID + '_' + date +'.jpeg';
	webshot(url, '.' + filePath, options, function(error) {
  	if (error){
  		cb(error);
  		return;
  	}
  	else {
  		cb(null, filePath);
  	}
	});	
}

process.once( 'SIGINT', function ( sig ) {
	console.log('SIGINT Recieved');
  process.exit( 0 );
});