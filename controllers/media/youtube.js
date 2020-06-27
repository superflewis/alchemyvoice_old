var express = require('express'),
    router = express.Router(),
    request = require('request')
search = require('youtube-search');
var fetchVideoInfo = require('youtube-info');
var getYouTubeID = require('get-youtube-id');
const fs = require('fs');
const ytdl = require('ytdl-core');

var querystring = require("querystring");
var path = require('path');
var Mopidy = require("mopidy");
var mopidy = new Mopidy({
    callingConvention: "by-position-only",
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});





router.post('/', function(req, res) {




    var findplay = req.body.findplay;
    //var findplay = "Tori Kelly Sing Worry";
    //var findplay = "https://www.youtube.com/watch?v=Bebe_r0g8oc";

    console.log("I am youtube.js playing: " + findplay);


    var ytid = getYouTubeID(findplay);

    console.log(ytid);

    //we're gonna play this or search for it
    if (ytid) {
        console.log("so what");

        fetchVideoInfo(ytid, function(err, videoInfo) {
            if (err) throw new Error(err);
            console.log(videoInfo.url);
            console.log(videoInfo.title);
            console.log(videoInfo.duration);

            var title = videoInfo.title;
            title = title.replace(/[^\w\s]/gi, '');
            title = title.replace(/  +/g, ' ');
            //title = require('querystring').escape(title);
            console.log(title);

            var duration = videoInfo.duration;

            if (Number(duration) > 0) {
                fileCheck(title, ytid);
            }
        });


    } else {

        console.log("I am youtube.js finding: " + findplay);

        var opts = {
            maxResults: 1,
            key: 'AIzaSyBWBZUV51xCfHBwba7qWFjK8-DAqVLGDuc'
        };

        console.log("findplay: " + findplay);


        search(findplay, opts, function(err, results) {
            if (err) return console.log(err);



            console.log("results: " + results[0].link);
            console.log("results: " + results[0].title);


            var ytid = getYouTubeID(results[0].link);

            fetchVideoInfo(ytid, function(err, videoInfo) {
                if (err) throw new Error(err);
                console.log(videoInfo.url);
                console.log(videoInfo.title);
                console.log(videoInfo.duration);

                var title = videoInfo.title;
                title = title.replace(/[^\w\s]/gi, '');
                title = title.replace(/  +/g, ' ');
                //title = require('querystring').escape(title);
                console.log(title);

                var duration = videoInfo.duration;

                if (Number(duration) > 0) {
                    fileCheck(title, ytid);
                }
            });




        });




    }



    function fileCheck(title, ytid) {

        console.log("I am filecheck: " + title + ytid);


        var path = __dirname + "/downloads/" + title + ".mp4";

        fs.stat(path, function(err, stat) {
            if (err == null) {
                console.log("I am filecheck, trying to play: " + title + ytid);

                mopidyPlay(title);

            } else if (err.code == 'ENOENT') {


                request.post({
                    url: 'http://localhost:8090/ytdl',
                    form: {
                        title: title,
                        ytid: ytid
                    }
                }, function(error, res, body) {
                    
                    console.log("I am filecheck and am waiting on a response from downloader");

                    console.log("body " + body);

                    if (body == 200) {

                        console.log("I am downloaded, trying to play: " + title + ytid);
                        
                        mopidyPlay(title);
                    }

                });


            }
        });

    }




    function mopidyPlay(title) {
        var uri = "file://" + __dirname + "/downloads/" + require('querystring').escape(title) + ".mp4";


        mopidy.tracklist.clear()
            .then(mopidy.tracklist.add(null, 0, uri))
            .then(mopidy.playback.play())
            .catch(console.error.bind(console))
            .done();
    }




    res.send('200');
})





router.post('/search', function(req, res) {
    console.log('youtube.js search called');











        var opts = {
            maxResults: 1,
            key: 'AIzaSyBWBZUV51xCfHBwba7qWFjK8-DAqVLGDuc'
        };

        console.log("findplay: " + findplay);


        search(findplay, opts, function(err, results) {
            if (err) return console.log(err);



            console.log("results: " + results[0].link);
            console.log("results: " + results[0].title);


            var ytid = getYouTubeID(results[0].link);

            fetchVideoInfo(ytid, function(err, videoInfo) {
                if (err) throw new Error(err);
                console.log(videoInfo.url);
                console.log(videoInfo.title);
                console.log(videoInfo.duration);

                var title = videoInfo.title;
                title = title.replace(/[^\w\s]/gi, '');
                title = title.replace(/  +/g, ' ');
                //title = require('querystring').escape(title);
                console.log(title);

                var duration = videoInfo.duration;

                if (Number(duration) > 0) {
                    fileCheck(title, ytid);
                }
            });




        });














    res.json({
        message: 'stopping audio'
    });


})








router.get('/stop', function(req, res) {
    console.log('youtube.js stoppng');
    res.json({
        message: 'stopping audio'
    });

    mopidy.connect();
    //mopidy.on(console.log.bind(console));

    mopidy.playback.stop();
    mopidy.off();
})

module.exports = router