var express     = require('express');
var router      = express.Router();
var request     = require('request');
var nodemailer  = require('nodemailer');
var client      = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);
// var resp = new twilio.TwimlResponse();
var js2xml = require('js2xmlparser');
var twilio = require('twilio');

var config = require('../../_config.js');

var twilioAPI = require('twilio-api'),
    cli = new twilioAPI.Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


var config = require('../../_config.js');
require('dotenv').load();


router.post('/call', function(req, res, next){

    cli.account.getApplication(process.env.TWILIO_APP_TOKEN, function(err, app) {
        if(err) throw err;
        console.log(app, "<==== app")
        app.register();

        app.makeCall("+12243884883", "+15555555555", function(err, call) {
            if(err) throw err;
            call.on('connected', function(status) {
                //Called when the caller picks up
                call.say("This is a test. Goodbye!");
            });
            call.on('ended', function(status, duration) {
                //Called when the call ends
            });
        });
    });

    // var phoneNumber = '+12243884883';

    // var callData = {
    //   'Dial': {
    //     '@': {
    //       'action' : '/forward?Dial=true',
    //       'callerId': '2243884883'
    //     },
    //     'Number': {
    //       '#' : phoneNumber
    //     }
    //   }
    // };

    // var x = res.header('Content-Type','text/xml').send(js2xml('Response', callData));

    // var y = Object.create(x);
    // console.log('y =====>', y)

    // console.log('x ====>', x)

    // client.calls.create({
    //     url: y,
    //     to: "+12243884883",
    //     from: "+17204109095"
    // }, function(err, call) {
    //     // console.log(err, 'error');
    //     // console.log(call, ' call');
    //     process.stdout.write(call.sid);
    // });


});



router.post('/text', function(req, res, next) {

    console.log(req.body)
    var number  = req.body.number;
    var to      = req.body.to;
    var message = req.body.message;
    var from    = req.body.from;

    console.log(message, ' message')

    client.sendMessage({

            to: number,
            from: '+17204109095',
            body: to + ', ' + message + '. Sincerely, ' + from

        }, function(err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
                res.send(responseData);
            }
    });
});


router.post('/mail', function (req, res, next) {

    // console.log(' req.body.title   ', req.body.title[0].description)
    var body    = req.body.body;
    var email   = req.body.email;
    var to      = req.body.to;
    var from    = req.body.from;

    console.log(req.body, '<==== req.body')

    console.log('body >', body, 'email >', email, 'from >', from, 'to >', to);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bitterlymessage@gmail.com',
            pass: process.env.GOOGLE
        }
    });

      var mailOptions = {
        from: 'Bitterly ✔ <bitterlymessage@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'You have a message from ' + from, // Subject line
        text: body, // plaintext body
        html: '<b>' + body + ' ✔</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        } else {
            res.send(info);
        }
        console.log('Message sent: ' + info.response);
    });

});


// client.calls.create({
//     url: "http://demo.twilio.com/docs/voice.xml",
//     to: "client:tommy",
//     from: "+14158675309"
// }, function(err, call) {
//     process.stdout.write(call.sid);
// });


// router.post('/call', function (req, res, next) {

//     // console.log(' req.body.title   ', req.body.title[0].description)
//     var body    = req.body.body;
//     var email   = req.body.email;
//     var to      = req.body.to;
//     var from    = req.body.from;

//     console.log(req.body, '<==== req.body')

//     console.log('body >', body, 'email >', email, 'from >', from, 'to >', to);

//     // client.calls.create({
//     //     url: "http://demo.twilio.com/docs/voice.xml",
//     //     to: "client:tommy",
//     //     from: "+14158675309"
//     // }, function(err, call) {
//     //     process.stdout.write(call.sid);
//     // });

// });

// twilio phone info
// SID
// PN30d7b6a74c573876ac56f911ec0da844
// Phone Number
// +17204109095

// router.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../client', 'index.html'));
// });

module.exports = router;
