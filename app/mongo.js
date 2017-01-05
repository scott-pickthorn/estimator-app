var mongojs = require('mongojs');
var db = mongojs('users', ['users']);

module.exports.printUsers = function(){
	  db.users.find(function (err, docs) { 
      console.log(docs);
  });
}
module.exports.saveUser = function(profile){
    db.users.save(profile);
    console.log("profile saved");
}
