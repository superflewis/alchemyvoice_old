// Import module.
const HotwordDetector = require('node-hotworddetector');
 
// Detector data.
// See the 'snowboy' module for more information.
const detectorData = {
  resource: '/home/pi/alchemyvoice/node_modules/snowboy/resources/common.res'
};
// Array of data for each hotword model.
// See the 'snowboy' module for more information.
const modelData = [
  {
    file: '/home/pi/alchemyvoice/controllers/listen/snowboy.umdl',
    hotwords : 'snowboy',
    sensitivity: '0.5'
  },
  {
    file: '/home/pi/alchemyvoice/controllers/listen/computer.pmdl',
    hotwords : 'computer',
    sensitivity: '0.5'
  }
];
// Optional parameter to select the recording options.
// See the 'node-audiorecorder' module for more information.
const recorderData = {
  audioGain: 2
};
// Optional parameter intended for debugging.
// The object has to implement a log and warn function.
const logger = console;
 
// Create an instance.
let hotwordDetector = new HotwordDetector(detectorData, modelData, recorderData, logger);

hotwordDetector.start();

// Triggered when an error is encountered.
hotwordDetector.on('error', function(error) {
  console.error('hotwordDetector: ' + error);
});
// Triggered when a hotword has been detected.
hotwordDetector.on('hotword', function(index, hotword, buffer) {
  // Index is the associated index of the detected hotword.
  // Hotword is a string of which word has been detected.
  // Buffer is the most recent section from the audio buffer.
  console.log('hotwordDetector: Hotword detected: ' + hotword);
});
// Triggered when there is no audible sound being recorded.
hotwordDetector.on('silence', function() {
  console.log('hotwordDetector: silence');
});
// Triggered when there is audible sound being recorded.
hotwordDetector.on('sound', function(buffer) {
  // Buffer is the most recent section from the audio buffer.
  console.log('hotwordDetector: sound: ');
});
