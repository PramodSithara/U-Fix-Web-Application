var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport')
require('dotenv').config();
require('./utility/authenticate')
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var faultRoute = require('./routes/faultsRoute');
var userRoute = require('./routes/userRoute');


var app = express();
app.use(cors());
app.use(session({ secret: process.env.SESSION_SE, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Implement DB
main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.MONGOURI);
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/fault', faultRoute);
app.use('/api/v1/user/', userRoute);
app.get('/api/v1/google', passport.authenticate('google', { scope: ['profile', 'email' ]}));

app.get('/api/v1/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const token = req.user;
  res.redirect(`http://localhost:3000/home?token=${token}`)
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
