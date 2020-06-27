var express = require('express'),
    router = express.Router(),
    request = require('request')
var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');


router.use("/", express.static(__dirname + '/views/'));


var options = {
  root: __dirname + '/views/'
};



router.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile('/index.html', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:');
    }
  });
});


//process.on('uncaughtException', function (err) {
//    console.log(err);
//});

module.exports = router
