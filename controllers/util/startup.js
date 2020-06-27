var express = require('express'),
    router = express.Router(),
    request = require('request')
var schedule = require('node-schedule')
exec = require('child_process').exec;

randomtime = "";

var hourly = schedule.scheduleJob('00 * * * *', function() { request.get('http://localhost:8090/time'); });

//var twitter = schedule.scheduleJob('10 * * * *', function() { request.get('http://localhost:8090/twitter'); });

//var podcast = schedule.scheduleJob('20 * * * *', function() { request.get('http://localhost:8090/podcast'); });

//var audiobook = schedule.scheduleJob('30 * * * *', function() { request.get('http://localhost:8090/audiobook'); });

//var quote = schedule.scheduleJob('01 * * * *', function() { request.get('http://localhost:8090/quote'); });

//var heartbeat = schedule.scheduleJob('01 * * * * *', function() { request.get('http://localhost:8090/heartbeat'); });

//var noisecheck = schedule.scheduleJob('05 * * * * *', function() { request.get('http://localhost:8090/levels/check/'); });

//var meditate = schedule.scheduleJob('02 * * * *', function() { request.get('http://localhost:8090/meditate'); });

//x = Math.floor(Math.random() * 59) + 1 
//x = (x < 10 ? '0' : '') + x;
//    console.log("from startup " + x);

//randomfunc = schedule.scheduleJob(x + ' * * * *', function() { request.get('http://localhost:8090/random'); }); 


//set mopidy volume




if (mode == "dev") {
	console.log("development mode");  
} else {
	//var nprtest = schedule.scheduleJob('15 * * * *', function() { request.get('http://localhost:8090/npr');
	//exec("/usr/local/bin/soundmeter -v --trigger -20000 2 --action exec --exec trigger.sh --daemonize --log");

	exec("/usr/bin/aoss /opt/swift/bin/swift -p speech/rate=150 'System is ready'");	
}






// y = Math.floor(Math.random() * 59) + 1 
// y = (y < 10 ? '0' : '') + y;
//     console.log("from rand for soundmeter " + y);

// var soundsample = schedule.scheduleJob(y + ' * * * *', function() { 
  	
// });


   




module.exports = router


