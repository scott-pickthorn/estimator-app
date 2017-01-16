var aws = require('aws-sdk');
var fs = require('fs');
var to = "scott.e.pickthorn@gmail.com";
var from = 'thepicky1@gmail.com';
module.exports.sendMail = function(email, estimate, callback) {
fs.readFile(__dirname + '/../public/views/realtorView.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);

	aws.config.loadFromPath('config.json');	
	var ses = new aws.SES();
	var template = '<div>high estimate: '+ estimate.high +'</div><div>mid estimate: '+ estimate.mid +'</div><div>low estimate: '+ estimate.low +'</div>';
	params = {
		Source: to,
		Destination: {ToAddresses: [email]},
		Message: {
			Body: {
				Html:{ Data:data}
			},
			Subject: {
				Data: 'Elton Properties House Valuation'
			}
		},
	};
	ses.sendEmail(params, function(err, data){
		if(err) return callback(err);
		else return callback(null, data);
	});
});
}
module.exports.connect = function(){
	console.log("mailer loaded");
}