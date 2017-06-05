var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);


var express = require('express');
var router = express.Router();
var session= require('express-session');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wollow',
  database : 'instagram'
});

connection.connect();

/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


connection.end();*/
router.use(session({
  secret: 'Shin',
  resave: false,
  saveUninitialized: true
}));

router.get('/',function(req, res, next){

  var sql = "SELECT * FROM user";
  connection.query(sql, function(error,results,fields){
    if(error) {
      console.log(error);
    }
    else {
      console.log('results',results);
      console.log('fileds', fields);
    }

  });
  res.render('login',{title:'Express'});
});

router.post('/', function(req, res, next) {
  user_name = req.body.id;
  user_password = req.body.password;
  var sql = "SELECT * FROM user WHERE name=?";
  conn.query(sql, [user_name], function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      var user = results[0];
      if (user_password == user.password) {
        console.log('same password!')
        req.session.authId = user_name;
        req.session.save(function() {
        console.log('성공');
        });
      } else {
        console.log('실패');
      }
    }
  });
res.end('{"success" : "Updated Successfully", "status" : 200}');
});

/*router.post('/', function(req, res){
   var user = {
    username:'abcd',
    password:'abcd',
    displayName:'Shin'
   };
   var uname = req.body.id;
   var pwd = req.body.password;

   if(uname == user.username && pwd == user.password)
   {
    console.log(uname,pwd);
    req.session.count = 1;
    res.redirect('/page1');
  }
});*/
module.exports = router;
