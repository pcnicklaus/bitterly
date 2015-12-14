var express     = require('express');
var router      = express.Router();
var request     = require('request');
var nodemailer  = require('nodemailer');
var client      = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);
var resp = new twilio.TwimlResponse();



require('dotenv').load();


router.post('/text', function(req, res, next) {

    console.log(req.body)
    var number  = req.body.number;
    var to      = req.body.to;
    var message = req.body.message;
    var from    = req.body.from;

    console.log(number, ' number', to, ' to', message, ' message')

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


client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "client:tommy",
    from: "+14158675309"
}, function(err, call) {
    process.stdout.write(call.sid);
});


router.post('/call', function (req, res, next) {

    // console.log(' req.body.title   ', req.body.title[0].description)
    var body    = req.body.body;
    var email   = req.body.email;
    var to      = req.body.to;
    var from    = req.body.from;

    console.log(req.body, '<==== req.body')

    console.log('body >', body, 'email >', email, 'from >', from, 'to >', to);

    client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: "client:tommy",
        from: "+14158675309"
    }, function(err, call) {
        process.stdout.write(call.sid);
    });

});

// router.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../client', 'index.html'));
// });

module.exports = router;
