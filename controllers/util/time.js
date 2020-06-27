var express = require('express')
  , router = express.Router()
  , request = require('request') 
var schedule = require('node-schedule');



router.get('/', function(req, res) {
	console.log('Time Requested');	
	res.json({ message: 'hooray! welcome to our api!' });

	var date = new Date();
    var hour = date.getHours();
    hour = ((hour + 11) % 12 + 1);
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;




    if (min == 00){
      min = "o'clock";
    } else if (/^0[1-9].*$/.test(min)) {
      var min = min.replace("0", "O");
    } else if (/0$/.test(min)) {
      //do nothing
    }



	request.post('http://localhost:8090/say', {form:{context:'time', msg:'The time is: ' + hour + ' ' + min}});
})


var j = schedule.scheduleJob('00 * * * *', function(){
  request.post('http://localhost:8090/time');
});


process.on('uncaughtException', function (err) {
   console.log(err);
}); 

module.exports = router