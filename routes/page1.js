var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);
router.get('/', function(req, res, next) {
  res.render('page1', { title: 'page1' });
});
module.exports = router;
