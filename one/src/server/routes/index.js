var express     = require('express');
var router      = express.Router();
var request     = require('request');
var nodemailer  = require('nodemailer');
var client      = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);
// var resp = new twilio.TwimlResponse();
var js2xml = require('js2xmlparser');
var twilio = require('twilio');
var tropo = require('simple-tropo')({
    token    : "11f28a446fe0f34cad258dc017084a53a669e201bf6acf47be1fd6bebe71cb3c8597b8cd6d49ec1301c926c2"
  });

var config = require('../../_config.js');

// var twilioAPI = require('twilio-api'),
//     cli = new twilioAPI.Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


var config = require('../../_config.js');
require('dotenv').load();

router.post('/text', function(req, res, next) {

    console.log('in text')
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

        }, function(err, responseData) {

            if (!err) {
                res.send(responseData);
            }
    });
});

// router.post('/phone', function(req, res, next){

//     console.log('hereeeeeeee')
//     var resp = {};
//     var call = req.body;

//     console.log('req.body /phone rt ====>', call)


//     var twClient = require('../twilio/call').triggerCall(call.to, call.from, call.number, call.message, function(error, response) {
//       if (error) {
//         // resp.status = "error";
//         // resp.response = error;
//         console.log('<== error in phone route', error)
//       }
//       // else {
//       //   resp.status = "success";
//       //   resp.response = response.sid;
//       // }

//       res.json(response);
//     });
// });


router.post('/phone', function (req, res, next) {

  // var number  = req.body.number;
  // var to      = req.body.to;
  // var from    = req.body.from;
  // var message = req.body.message;
  // var token = '11f28a446fe0f34cad258dc017084a53a669e201bf6acf47be1fd6bebe71cb3c8597b8cd6d49ec1301c926c2';

    call(['+12243884883'], {
     timeout:120,
     callerID:'14075550100',
        onAnswer: function() {
         say("Tag, you're it!");
         log("Obnoxious call complete");
     },
     onTimeout: function() {
         log("Call timed out");
     },
     onCallFailure: function() {
         log("Call could not be completed as dialed");
     }
  });

  // tropo.send({ //type:'message' - (SMS) is default
  //    type   : 'message',
  //    to     : "+12243884883",
  //    say    : "your message"
  // },function(err, res){
  //   console.log("message was delivered")
  // })
  // request({
  //   method: 'POST',
  //   url: 'https://api.tropo.com/1.0/sessions?action=create&token=' + token + '&numberToDial=' + number + '&customerName=' + req.body.name + '&msg=the+sky+is+falling'
  // }, function(err, response){
  //   if(err){
  //     console.log('err', err);
  //     res.json(err);
  //   } else {

  //     var result = JSON.parse(response.body).keywords;
  //     // console.log(response.body);
  //     // console.log(response.body.status, "STATUS");
  //     console.log(result, "RESULT");
  //     res.json(result);
  //     // res.render('index', {keywords: result[0].text});
  //     // res.send(result);

  //   }
  // });

// 'http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords?text='+cleaned2+'&apikey=' + process.env.ALCHEMY + '&outputMode=json&sentiment=1&showSourceText=1'

//   https://api.tropo.com/1.0/sessions?action=create&token=TOKEN&numberToDial=14075551212&customerName=John+Dyer&msg=the+sky+is+falling


});

// router.get('/phone', function(req, res, next){

//     var phoneNumber = '2243884883';

//     var callData = {
//       'Dial': {
//         '@': {
//           'action' : '/forward?Dial=true',
//           'callerId': 'XXXXXXXXXX'
//         },
//         'Number': {
//           '#' : phoneNumber
//         }
//       }
//     };

//     res.header('Content-Type','text/xml').send(js2xml('Response', callData));
// });


// router.post('phone/:id', function(req, res) {
//   // var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();

//   console.log('req.body in id route====>', req.body)

//   var options = {
//     voice: 'woman',
//     language: 'en-gb'
//   };

//   twiml.say('Hello' + req.body.toName + '! This messge is from' + req.body.fromName +'. ' + req.body.message, options);

//   res.writeHead(200, {
//     'Content-Type': 'text/xml'
//   });
//   res.send(twiml.toString());
// });


router.post('/voice', function (req, res, next) {

  var body  = req.body.body;
  var email = req.body.email;
  var to    = req.body.to;
  var from  = req.body.from;

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

})



router.post('/mail', function (req, res, next) {


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




module.exports = router;
