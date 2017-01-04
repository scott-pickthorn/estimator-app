var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var mailer = require('./app/mail.js');
var db = require('./app/mongo.js');
var estimator = require('./app/estimate.js');

var app = express();
var profile = {};
var estimate = {};

app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/house_estimate/:address&:cityState', function (req, res) {
  if(!req.params.address){  
    return res.status(412).send('No address field');
  }
  if(!req.params.cityState){  
    return res.status(412).send('No city and state field');
  }
  estimator.getEstimate(req.params.address, req.params.cityState, function(err, estimate){
    this.estimate = estimate;
    res.send(estimate);
  });
  console.log(estimate);
});


app.get('/email_estimate/:profile&:email', function(){
  mailer.sendMail("scott.e.pickthorn@gmail.com", estimate);
});


app.get('/api_key', function (req, res) {
  res.send(api_key);
  console.log('I received a key request');
});


app.post('/info', function (req, res) {
  // if(!req.body.profile.name){
  //   return res.status(412).send('No name field');
  // }
  // if(!req.body.profile.email){  
  //   return res.status(412).send('No email field');
  // }
  // profile = {"name": req.body.profile.name,
  //            "email": req.body.profile.email
  // };
  //db.saveUser(profile);
  console.log(req.body);
  res.send('success');
});
  

app.set('port', process.env.PORT || 3000);


http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
    mailer.connect();
    //db.connect();
});