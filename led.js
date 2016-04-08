var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('./public'));


http.listen(3000, function(){
  console.log('listenting on 3000!');
})



five.Board().on('ready', function(){
  console.log('Board ready!!');

  var led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  this.repl.inject({
    led: led
  });

  led.on();
  led.color("#7f7f7f");

  io.on('connection', function (socket) {
    console.log('connection on ' + socket.id);
    socket.on('sliders', function(message) {
      led.color(message);
    });
  });

});
