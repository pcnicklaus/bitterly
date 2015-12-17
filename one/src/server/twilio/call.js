// var logger      = require('../logger/log');
var client      = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);

var call = {};

call.triggerCall = function(to, from, number, message, callback) {
  //Place a phone call, and respond with TwiML instructions from the given URL

  console.log('to >', to, 'from > ', from, 'number >>', number, 'message>', message);

  client.makeCall({

    to: number, // Any number Twilio can call
    fromName: from,
    number: number,
    message: message,
    from: '+17204109095',
    url: 'http://127.0.0.1/call/' + (Math.ceil((Math.random() * 10) % 2))

  }, function(error, response) {

    if (error) {
      console.log(error)
    } else {

      console.log(response)
    }
    // callback(error, response);

  });

};

module.exports = call;
