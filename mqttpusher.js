var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
 
var io  = require('socket.io').listen(5000);
var client = new mqtt.createClient(1883, '127.0.0.1');
client.subscribe('#');

io.sockets.on('connection', function (socket) {
//  socket.on('subscribe', function (data) {
	  socket.join('subscribe');
		//  socket.join('subscribe',
		//function (data) {
//    console.log('Subscribing to '+data.topic);
//    client.subscribe(data.topic);
//    client.subscribe('#');

  });

client.on('message', function (topic, message) {
  console.log(topic + ' - ' + message);
//Sends mqtt message to socekt.io client
var today=new Date();
  	      var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		// add a zero in front of numbers<10
m=checkTime(m);
s=checkTime(s);
h=checkTime(h);
	io.sockets.emit('mqtt',{'topic':String(topic),
    'payload':String(h+":"+m+":"+s+" - <b>"+message+"</b><br>")});
  //io.sockets.emit('mqtt',{'topic':String(topic),
   // 'payload':String(message)});

//});
});
 
/*client.addListener('mqttData', function(topic, payload){
  sys.puts(topic+'='+payload);
  io.sockets.emit('mqtt',{'topic':String(topic),
    'payload':String(payload)});
});*/