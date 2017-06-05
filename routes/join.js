var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);


router.get('/', function(req, res, next) {
    if (req.session.authId) {
      res.render('page1', {
        user : req.session.authId,
        title: 'Shin'
      });
    }
    else
    {
      res.render('join',
      {
        title: 'Shin'
      });
    }
  });
  router.post('/', function(req, res, next) {
  user_name = req.body.id;
  password = req.body.password;
  var sql = "INSERT INTO `user` (`name`, `password`) VALUES (?, ?);";
    conn.query(sql, [user_name, password], function(error, results, fields) {
      if (error)
      {
        console.log(error);
      }
      else
      {
        console.log('results', results);
        console.log('fileds', fields);
        req.session.authId = user_name;
        req.session.save(function()
        {
          console.log('가입 성공');
        });
      }
    });
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  });
module.exports = router;
