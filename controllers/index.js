var express = require('express')
  , router = express.Router()
  , exec = require('child_process').exec
request = require('request')    
//router.use('/listen', require('./listen/snowboy'))
router.use('/say', require('./say/polly'))
//-router.use('/home', require('./util/home'))


// router.use('/config', require('./util/config'))
// router.use('/startup', require('./util/startup'))
// router.use('/heartbeat', require('./util/heartbeat'))
router.use('/time', require('./util/time'))
// router.use('/alarm', require('./util/alarm'))
// router.use('/forbes', require('./util/forbes'))
// router.use('/quotes', require('./util/quotes'))
// router.use('/design', require('./util/design'))
// router.use('/weather', require('./util/weather'))
// router.use('/joke', require('./util/joke'))
// router.use('/meditate', require('./util/meditate'))
// router.use('/gatekeeper', require('./util/gatekeeper'))
// router.use('/keymaster', require('./util/keymaster'))
// router.use('/sqloader', require('./util/sqloader'))
// router.use('/random', require('./util/random'))
// router.use('/levels', require('./util/levels'))
// router.use('/entity', require('./util/entity'))
// router.use('/shutdown', require('./util/shutdown'))
// //bot
// router.use('/eliza', require('./bot/eliza'))
// router.use('/cleverbot', require('./bot/cleverbot'))
// //media
// router.use('/kodi', require('./media/kodi'))
// router.use('/shoutcast', require('./media/shoutcast'))
// router.use('/music', require('./media/music'))
// router.use('/youtube', require('./media/youtube'))
// router.use('/radio', require('./media/radio'))
// router.use('/ytdl', require('./media/youtubedl'))
// router.use('/mopidy', require('./media/mopidy'))
// router.use('/tagger', require('./media/tagger'))
// router.use('/audiobook', require('./media/audiobook'))
// router.use('/audio', require('./media/audio'))
// router.use('/npr', require('./media/npr'))
// router.use('/podcast', require('./media/podcast'))
// router.use('/subliminal', require('./media/subliminal'))
// //say routes
// router.use('/cepstral', require('./say/cepstral'))
// //router.use('/gtts', require('./say/gtts'))
// router.use('/polly', require('./say/polly'))
// router.use('/say', require('./say/polly'))
// //scratch routes
// router.use('/test', require('./test'))
// router.use('/throttle', require('./test/throttle'))
// //social routes
// router.use('/twitter', require('./social/twitter'))
// //listen routes
// router.use('/listen', require('./listen/gstt'))
// router.use('/gstt', require('./listen/gstt'))
// router.use('/witai', require('./listen/witai'))
// router.use('/soundtest', require('./listen/soundtest'))
// router.use('/wakeword', require('./listen/wakeword'))
// router.use('/continuous', require('./listen/continuous'))
// //frontend routes
//router.use('/web', require('./front/web'))
// router.use('/iotest', require('./iotest/web'))
// router.use('/init', require('./util/init'))

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log("Request received");

  //var child = require('child_process').exec('/usr/bin/aoss /opt/swift/bin/swift -p speech/rate=150 "I gotchu"');
  //child.stdout.pipe(process.stdout)
  //child.on('exit', function() {
//    return res.send('200');
  //})

	res.json({ message: 'hooray! welcome to our api!' });

});
request.post('http://localhost:8090/say', {form:{msg:'Here\'s a quote.'}});

exports.route = function(req, res){
    variable_i_needed = req.app.locals.variable_you_need;
}

module.exports = router
