var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var cookieSession = require('cookie-session');
var passport = require('passport');
var keys = require('./config/keys');
var passportSetup = require("./config/passport-setup");
var session = require('express-session');
var cookieParser = require('cookie-parser');


var app = express();
var port = 3000;

var auth = require("./routes/auth");
var events = require('./routes/events');
var newEvent = require('./routes/newEvent');
var welcome = require('./routes/first');
var show = require('./routes/show');
var homepage = require('./routes/homepage');
var users = require("./routes/users");
var showUser = require("./routes/showUser");
var adminWelcome = require('./routes/adminWelcome');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(cookieSession({
  name: 'session',
  maxAge: 24*60*60*1000,
  keys: ['key1', 'key2']
}));


app.use(passport.initialize());
app.use(passport.session());


app.use('/events', events);
app.use('/newEvent', newEvent);
app.use('/show', show);
app.use('/', homepage);
app.use("/auth", auth);
app.use('/welcome', welcome);
app.use('/users', users);
app.use('/showUser', showUser);
app.use('/adminWelcome', adminWelcome);



app.listen(port, (err)=>{
  if(err) console.log("Error in connection");
  console.log("connected to port: " + port );
});
