//var aws = require('aws-sdk');
var to = "scott.e.pickthorn@gmail.com";
//var from = 'thepicky1@gmail.com';
module.exports.sendMail = function(email) {
	aws.config.loadFromPath('config.json');
	var ses = new aws.SES();
	err = ses.sendMail({
		Source: to,
		Destination: [email],
		subject: 'test',
		html: '<div>helloworld</div>'
	});
	console.log(err);
}
module.exports.connect = function(){
	console.log("mailer loaded");
}