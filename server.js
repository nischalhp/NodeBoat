var express = require('express')
var app = express()

// spark io functions
console.log("Initializing variables")
var five = require("johnny-five");
var Spark = require("spark-io");
var motorL;
var motorR;
var servo;


var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {
  console.log(" board ready" );

  motorL = new five.Motor({
    pin: 'A7'
  });

  motorR = new five.Motor({
    pin: 'A6'
  });

  console.log("Motors initialized");

	servo = new five.Servo({
  	pin : "A1",
  	startAt : 90,
  	range : [45,135]
  })

  console.log("Rudder initialized");

});

// routes
app.get('/rudder/:degree', function (req, res) {
	servo.to(parseInt(req.params.degree));
	res.send(req.params.degree);
	console.log(" Speed click " +req.params.degree);
})

app.use(express.static(__dirname));

app.get('/motor/:power', function (req, res) {
	console.log(req.params.power);
	if (req.params.power === '1'){
		console.log(" On ");
		motorL.start(255);
		motorR.start(255);
	}
	else {
		motorL.stop();
		motorR.stop();
	}
	res.send(req.params.power);
	console.log(" Power click for motors " +req.params.power);
})


  var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})