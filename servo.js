var five = require("johnny-five");
var Spark = require("spark-io");

var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {

var servo = new five.Servo({
  	pin : "A1",
  	startAt : 90,
  	range : [45,135]
  });

  board.repl.inject({
    s: servo
  });

});