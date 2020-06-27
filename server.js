var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))
app.use(express.static(__dirname + 'assets'));

app.locals.variable_you_need = 42;


module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });

        //End ON Events
    });
    return router;
};


http.listen(8090, function(){
    console.log('listening on *:8090');
});