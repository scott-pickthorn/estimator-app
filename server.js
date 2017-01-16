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
    if(err){
      console.log(err);
      res.send(err);
    }
    this.estimate = estimate;
    console.log(estimate);    
    res.send(estimate);

  });
});


app.post('/email_estimate', function(req, res){
  console.log("i recieved an email request");
  mailer.sendMail(req.body.email, req.body.estimate, function(err, data){
     
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data);
  });
});


app.get('/api_key', function (req, res) {
  res.send(api_key);
  console.log('I received a key request');
});


app.post('/info', function (req, res) {
 console.log(req.body);
 if(!req.body.name){
    return res.status(412).send('No name field');
  }
  if(!req.body.email){
    return res.status(412).send('No email field');
  }
  profile = {"name": req.body.name,
             "email": req.body.email
  };
 // db.saveUser(profile);
  res.send('success');
});
  

app.set('port', process.env.PORT || 3000);


http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
    mailer.connect();
    //db.connect();
});