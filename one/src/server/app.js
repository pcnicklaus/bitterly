// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();


var swig = require('swig');
var twilioAPI = require('twilio-api');
var cli = new twilioAPI.Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);




mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/bitterly");

// *** routes *** //
var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(cli.middleware() );


app.post('/call', function(req, res, next){

      if (twilio.validateExpressRequest(req, config.authToken)) {
          var resp = new twilio.TwimlResponse();
          resp.say('express sez - hello twilio!');

          res.type('text/xml');
          res.send(resp.toString());

          // client.calls.create({

          //     to: "+12243884883",
          //     from: "+17204109095"
          // }, function(err, call) {
          //     // console.log(err, 'error');
          //     // console.log(call, ' call');
          //     process.stdout.write(call.sid);
          // });
      }
      else {
          res.send('you are not twilio.  Buzz off.');
      }

});

// *** main routes *** //
app.use('/', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
