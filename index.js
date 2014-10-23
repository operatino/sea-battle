var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(require('compression')());
app.use(express.static('./public'));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('playerReady', function () {
        console.log('playerReady');
    });
});

http.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});