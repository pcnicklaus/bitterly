in index routes

//     // var phoneNumber = '+12243884883';

//     // var callData = {
//     //   'Dial': {
//     //     '@': {
//     //       'action' : '/forward?Dial=true',
//     //       'callerId': '2243884883'
//     //     },
//     //     'Number': {
//     //       '#' : phoneNumber
//     //     }
//     //   }
//     // };

//     // var x = res.header('Content-Type','text/xml').send(js2xml('Response', callData));

//     // var y = Object.create(x);
//     // console.log('y =====>', y)

//     // console.log('x ====>', x)

//     // client.calls.create({
//     //     url: y,
//     //     to: "+12243884883",
//     //     from: "+17204109095"
//     // }, function(err, call) {
//     //     // console.log(err, 'error');
//     //     // console.log(call, ' call');
//     //     process.stdout.write(call.sid);
//     // });




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
