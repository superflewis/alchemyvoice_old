var express = require('express'),
	router = express.Router(),
	request = require('request')


var lastplayed;
var now;

router.get('/', function(req, res) {

console.log(Date.now())
console.log('now: ' + Date.now())
now = Date.now()
console.log('lastplayed: ' + lastplayed)
diff = (now - lastplayed)
console.log('difference: ' + diff)
lastplayed = Date.now();

if (diff > 100000) {

	var textArray = [
		'Who\'s there?',
		'Is someone there?',
		'Hello, is someone there?',
		'I know you\'re there, I can hear you.'
	];
	var randomIndex = Math.floor(Math.random() * textArray.length); 
	var sayThis = textArray[randomIndex];

	console.log(textArray[randomIndex]);

	request.post({url: "http://localhost:8090/say", form: {msg:sayThis}}, function(error, response, body) {  
			 //startListen();
	});
}

 res.send('200');

})


module.exports = router
