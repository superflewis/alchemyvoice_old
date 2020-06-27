// Import module.
const HotwordDetector = require('hotwordwrapper');
 
// Detector data.
// See the 'snowboy' module for more information.
const detectorData = {
  resource: './node_modules/snowboy/resources/common.res'
};
// Array of data for each hotword model.
// See the 'snowboy' module for more information.
const modelData = [
  {
    file: 'snowboy.umdl',
    hotwords : 'snowboy',
    sensitivity: '0.5'
  }
];
// Optional parameter to select the recording options.
/*
options - JSON containing command line options. Following are valid options:
endian: big OR little, default: little
bitwidth: 8 OR 16 OR 24 OR anything valid supported by arecord OR sox, default: 16
encoding: signed-integer OR unsinged-integer (none of the other encoding formats are supported), default:signed-integer
rate: 8000 OR 16000 OR 44100 OR anything valid supported by arecord OR sox, default: 16000
channels: 1 OR 2 OR anything valid supported by arecord OR sox, default: 1 (mono)
device: hw:0,0 OR plughw:1, 0 OR anything valid supported by arecord. Ignored for sox on macOS.
debug: true OR false - can be used to aide in debugging
fileType: string defaults to 'raw', allows you to set a valid file type such as 'wav' (for sox only) to avoid the no header issue mentioned above, see a list of types here
*/
const recorderData = {
  rate: '16000',
    channels: '1',
    debug: true,
};
// Optional parameter intended for debugging.
// The object has to implement a log and warn function.
const logger = console;
 
// Create an instance.
let hotwordDetector = new HotwordDetector(detectorData, modelData, recorderData, logger);
