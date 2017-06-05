var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var page1 = require('./routes/page1');
var page2 = require('./routes/page2');
var join = require('./routes/join');
var login = require('./routes/login');
var practice = require('./routes/practice')(app);
var session= require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(session({
  secret: 'Shin',
  resave: false,
  saveUninitialized: true
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*app.post('/login', function(req, res){
   var user = {
    username:'abcd',
    password:'abcd',
    displayName:'Shin'
   };
   var uname = req.body.id;
   var pwd = req.body.password;
   if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName;
   res.redirect('/page1');
 }});*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/page1',page1);
app.use('/page2',page2);
app.use('/login',login);
app.use('/join',join);
app.use('/practice',practice);
app.use(passport.initialize());
app.use(passport.session());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'wollow',
  database: 'instagram'
  };
  app.use(session({
  secret: 'fghgrtythgfhgdgfsgvyvygrzmnjhdsfd',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(options)
}));
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
