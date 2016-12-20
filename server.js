var express = require('express');
var http = require('http');
var url = require('url');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
var request = require('request');
var xmlParser = require('xml2js').parseString;
var app = express();
var nodemailer = require('nodemailer');
var profile = {};
var estimate = {};


var zwsid = 'X1-ZWz19g98gn4zrf_3e7gq';
var api_key = 'AIzaSyAaOzU7c_8RDreOb24Cugn1D9_gaWt0_To';

app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/house_estimate/:address&:cityState', function (req, res) {
  if(!req.params.address){  
    return res.status(412).send('No address field');
  }
  var address = urlencode(req.params.address);
  var citystatezip = urlencode(req.params.cityState);
  request('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19g98gn4zrf_3e7gq&address=' + address + '&citystatezip=' + citystatezip, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     xmlParser(body, function(err,result){ 
      statusCode = result['SearchResults:searchresults']['message'][0]['code'][0];
       if(statusCode == 0){
    estimate = {
        "lat": result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['address'][0]['latitude'][0],
        "lng": result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['address'][0]['longitude'][0],
        "low": result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['zestimate'][0]['valuationRange'][0]['low'][0]['_'],
        "mid": result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['zestimate'][0]['amount'][0]['_'],
       "high": result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['zestimate'][0]['valuationRange'][0]['high'][0]['_']
      };
      console.log(estimate);
      res.send(estimate);
    }else{
      console.log(statusCode);
      res.send(statusCode);
    }
      });
   }
  else{
   res.sendStatus(response.statusCode + '\r\n');
  }
});
  console.log('I received a house request');
});
app.get('/api_key', function (req, res) {
  res.send(api_key);
  console.log('I received a key request');
});
app.post('/info', function (req, res) {
  if(!req.body.name){
    return res.status(412).send('No name field');
  }
  if(!req.body.address){  
    return res.status(412).send('No address field');
  }
  if(!req.body.number){
    return res.status(412).send('No number field');
  }
  profile = {"name": req.body.name,
             "address": req.body.address,
              "number": req.body.number
  };
  res.send('success');
});

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
});