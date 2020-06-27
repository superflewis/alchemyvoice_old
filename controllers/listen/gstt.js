console.log("ENV VAR:", process.env.GOOGLE_APPLICATION_CREDENTIALS)

var express = require('express'),
    router = express.Router(),
    request = require('request'),
    rec = require('node-record-lpcm16')
var exec = require('child_process').exec;
var player = require('node-wav-player');

// ********************TESTING SPEECH ENGINE******************* //

const recorder = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();











router.get('/', function(req, res) {



// Creates a client

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('recognizeStream error', console.error)
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

const recording = recorder.record({
  recorder: 'arecord'
})

// Start recording and send the microphone input to the Speech API
recording
  .stream({
    sampleRateHertz: sampleRateHertz,
    threshold: 0.5,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream)
  .on('data', function () { 
    recording.stop()
    recording.unpipe(recording)
  });

})








//process.on('uncaughtException', function (err) {
//    console.log(err);
//});

module.exports = router

