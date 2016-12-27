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
  estimate = estimator.getEstimate(req.params.address, req.params.cityState);
  console.log('I received a house request');
  if(estimate == 500){
    return res.status(500).send('no response from zillow');
  }
  console.log(estimate);
  res.send(estimate);
});


app.get('/api_key', function (req, res) {
  res.send(api_key);
  console.log('I received a key request');
});


app.post('/info', function (req, res) {
  if(!req.body.name){
    return res.status(412).send('No name field');
  }
  if(!req.body.email){  
    return res.status(412).send('No address field');
  }
  profile = {"name": req.body.name,
             "email": req.body.email
  };
  mailer.sendMail(profile.email);
  res.send('success');
});
  

app.set('port', process.env.PORT || 3000);


http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
    mailer.connect();
    db.printUsers();
    estimate = estimator.getEstimate("123", "342342");
    console.log(estimate);
});


