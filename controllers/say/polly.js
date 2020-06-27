var express = require('express'),
    router = express.Router(),
    request = require('request')
const AWS = require('aws-sdk')
const Stream = require('stream')
const Speaker = require('speaker')

router.post('/', function(req, res) {

    say = req.body.msg;
    console.log(say);

//    if (mode == "dev") {
 //       console.log("[polly] skipping audio..." + mode);

   // } else {
      
       fetchAudio();

   // }


    function fetchAudio() {
            // Create an Polly client
            const Polly = new AWS.Polly({
                signatureVersion: 'v4',
                region: 'us-east-1'
            })

            // Create the Speaker instance
            const Player = new Speaker({
                channels: 1,
                bitDepth: 16,
                sampleRate: 16000
            })

            params = {
                'Text': say,
                'OutputFormat': 'pcm',
                'VoiceId': 'Kendra'
            }


Player.on('close', function(){
  console.log("prolly done")
  res.send('200');
});


            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        // Initiate the source
                        var bufferStream = new Stream.PassThrough()
                            // convert AudioStream into a readable stream
                        bufferStream.end(data.AudioStream)
                            // Pipe into Player
                        bufferStream.pipe(Player)
                    }
                }
            })
    }


    

})










module.exports = router

