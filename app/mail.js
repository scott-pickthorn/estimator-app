var aws = require('aws-sdk');
var to = "scott.e.pickthorn@gmail.com";
var from = 'thepicky1@gmail.com';
module.exports.sendMail = function(email, estimate) {
	aws.config.loadFromPath('config.json');	
	var ses = new aws.SES();
	params = {
		Source: to,
		Destination: {ToAddresses: [email]},
		Message: {
			Body: {
				Html:{ Data:'<div>estimate: '+ estimate +'</div>'}
			},
			Subject: {
				Data: 'Elton Properties House Valuation'
			}
		},
	};
	ses.sendEmail(params, function(err, data){
		if(err) console.log(err, err.stack);
		else console.log(data);
	});
}
module.exports.connect = function(){
	console.log("mailer loaded");
}