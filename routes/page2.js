var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('page2', { title: 'page2' });

});
module.exports = router;
