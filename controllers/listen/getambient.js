var Database = require('better-sqlite3');
var path = require('path');
const exec = require('child_process').exec

exec('soundmeter --collect --seconds 10', (err, stdout, stderr) => getavg(stdout))

//Collecting RMS values...
//       346  Timeout
//Collected result:
//    min:        333
//    max:        375
//    avg:        341

function getavg(output) {
console.log(output);

	//get last line of output
	var avgindex = output.lastIndexOf('avg:')
	//console.log(avgindex);

	var avgline = output.slice(avgindex); 
	//console.log(avgline);

	var avgval = avgline.match(/(\d+)/);

	console.log(avgval[0]);
	writedb(avgval[0]);
}


function writedb(avgval) {

    var dbpath = path.join(__dirname, '../util/db/', 'alchemy.db');
    var db = new Database(dbpath);

}