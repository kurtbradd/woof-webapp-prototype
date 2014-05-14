var phantom = require('phantom');

var session;
phantom.create({port:3005},function (cb_session) {
	session = cb_session;
	console.log('session created');
});

exports.renderPrescreenProfile = function (userID, cb) {
	session.createPage(function (page, err) {
		if (err) {
			return cb('createpage error');
		}
		page.set('paperSize', {format:'A4'});
		url = 'http:localhost:3000/api/prescreen-profile/render/' + userID;
		pathToSave = '../pdfs/' + userID + '.pdf';
		page.open(url, function (status) {
			if (status === "success") {
				page.render(pathToSave, function() {
					cb(false, pathToSave);
				});
			} else {
				cb('cant open page error');
			}
			page.close();
			//session.exit();
		});
	});
};

process.once( 'SIGINT', function ( sig ) {
	console.log('SIGINT Recieved');
	session.exit();
  process.exit( 0 );
});

// var PDFDocument = require('pdfkit');
// var doc = new PDFDocument;
// doc.pipe(fs.createWriteStream('output.pdf'));
// doc.fontSize(25).text('Some text with an embedded font!', 100, 100);
// doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
// doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");
// doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();
// doc.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
//   color: "#0000FF"
// }).link(100, 100, 160, 27, 'http://google.com/');
// doc.end();