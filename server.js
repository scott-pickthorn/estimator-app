var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('playerList', ['data']);
var users = mongojs('playerList', ['userList']);
var bodyParser = require('body-parser');
var http = require('http');
var pyShell = require('python-shell');
var path = require('path');
var app = express();

app.use('/',express.static(__dirname + '/public'));
app.use('/register',express.static(__dirname + '/public/controllers/register'));
app.use('/login',express.static(__dirname + '/public/controllers/login'));
app.use(bodyParser.json());

app.get('/playerList', function (req, res) {
  console.log('I received a GET request');

  db.data.find(function (err, docs) {
 
    res.json(docs);
  });
});

app.post('/register/user', function (req, res) {
  var password = req.body.password;
   console.log(password);
  userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    
};
console.log(userSchema.hash);
  // users.userList.insert(req.body, function(err, doc) {
  //   res.json(doc);
  // });
});

app.get('/playerList/:id', function (req, res) {
  var id = req.params.id;

  db.data.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.post('/playerList', function (req, res) {

  db.data.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
});

//for running python script and displaying to screen, currently the data is hardcoded
//pyShell.run('python/decisionTree.py', function(err){
//	if(err) throw err;
//	console.log('decisionTree finished');
//});
