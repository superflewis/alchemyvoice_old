const recorder = require('node-record-lpcm16')
const fs = require('fs')
 
const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
const recording = recorder.record()
recording.stream().pipe(file)
 
// Pause recording after one second
setTimeout(() => {
  recording.pause()
}, 1000)
 
// Resume another second later
setTimeout(() => {
  recording.resume()
}, 2000)
 
// Stop recording after three seconds
setTimeout(() => {
  recording.stop()
}, 3000)
