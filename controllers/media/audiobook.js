var express = require('express'),
    router = express.Router(),
    request = require('request')
var exec = require('child_process').exec;
var Mopidy = require("mopidy");
var mopidy = new Mopidy({
    callingConvention: "by-position-only",
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});
var Database = require('better-sqlite3');
var path = require('path');


router.get('/', function(req, res) {

    var dbpath = path.join(__dirname, '../util/db/', 'userdata.db');
    var db = new Database(dbpath);


    var mname = db.prepare('SELECT * FROM activities WHERE type="audiobook"');

    var rows;
    try {
        rows = mname.get();
    } catch (err) {
        console.error(err);
    }    

    if (rows) {
        console.log("position: " + rows.position);
        console.log("filename: " + rows.filename); 

        position = rows.position;
        filename = rows.filename;
        album = rows.altname;
        index = rows.index;

        continuePlay(album,filename,index,position);

    } else {
        playFirstAlbum();
    }
    //console.log("I'm mopidy from the audiobook");

    //this is where we select the first album
    //prolly don't wanna change it








    function continuePlay(album,loc,index,position) {

        console.log("continuePlay");

            mopidy.library.search({'album': [album]}).then(function(res) {



               console.log(res);


               position = Math.round(position);

               console.log(position);

               for (var i = 0; i < res.length; i++) {
                    if (res[i].uri) {
                    var tracks = res[i].tracks;
                        if (tracks) {
                            mopidy.tracklist.clear().then(function() {
                                return mopidy.tracklist.add(tracks).then(function (tlTracks) {
                                    return mopidy.playback.play(tlTracks[index]).then(function () {
                                        return mopidy.playback.seek(position).then(function () {
                                                                                      
                                        });                                        
                                    });
                                });
                            });
                        }
                    } else {
                        console.log("no results found");
                    }
                }

            });      
    }















    function skipTrackPos() {

        console.log("skipTrackPos");

    }



    function playFirstAlbum() {

        var firstalbum = "";

        mopidy.library.browse('local:directory?type=album').then(function(res) {
            //console.log("got tracks result", res); // prints []

            for (var i = 0; i < res.length; i++) {
                if (res[i].uri) {
                    var name = res[i].name;
                    if (name) {
                        //console.log(JSON.stringify(name));
                    }
                } else {
                    console.log("no results found");
                }
            }

            firstalbum = res[0].name;

            mopidy.library.search({'album': [firstalbum]}).then(function(res) {

                for (var i = 0; i < res.length; i++) {
                    if (res[i].uri) {
                    var tracks = res[i].tracks;
                        if (tracks) {
                            mopidy.tracklist.clear().then(function() {
                                mopidy.tracklist.add(tracks).then(function(tracks) {
                                    console.log("added tracks");
                                    console.log(JSON.stringify(tracks));
                                    mopidy.playback.play(); 

                                });
                            });
                        }
                    } else {
                        console.log("no results found");
                    }
                }

            firsttrack = res[0].tracks[0].uri;
            console.log(firsttrack);

            });
        });        

    }








 res.send('200');

});









router.get('/berthadudde', function(req, res) {

            mopidy.library.search({'artist': ['bertha']}).then(function(res) {
 
                for (var i = 0; i < res.length; i++) {
                    if (res[i].uri) {
                    var tracks = res[i].tracks;
                        if (tracks) {
                            mopidy.tracklist.clear().then(function() {
                                mopidy.tracklist.add(tracks).then(function(tracks) {
                                    console.log("added tracks");
                                    console.log(JSON.stringify(tracks));
                                    mopidy.tracklist.shuffle();
                                    mopidy.playback.play(); 
                                    context1 = "berthadudde";
                                });
                            });
                        }
                    } else {
                        console.log("no results found");
                    }
                }
            });

 res.send('200');

});






module.exports = router
