var express = require('express'),
    router = express.Router(),
    request = require('request')
search = require('youtube-search');
var Mopidy = require("mopidy");
var mopidy = new Mopidy({
    callingConvention: "by-position-only",
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});


router.get('/', function(req, res) {



    var opts = {
        maxResults: 10,
        key: 'AIzaSyBWBZUV51xCfHBwba7qWFjK8-DAqVLGDuc'
    };

    search('Tori Kelly Sing Worry', opts, function(err, results) {
        if (err) return console.log(err);

        var randomvid = results[Math.floor(Math.random() * results.length)];

        console.log(randomvid.link);


        yt_url = "yt:" + randomvid.link

        console.log(yt_url)



        //var st_url = body;
        //request.post('http://localhost:6680/mopidy/rpc', {"jsonrpc":"2.0","id":1,"method": "core.tracklist.add","params":{"uri":"http://38.107.242.36:8000/stream"}});
        //request.post('http://localhost:6680/mopidy/rpc', {"jsonrpc":"2.0","id":1,"method": "core.playback.play"});
        mopidy.connect();
        //mopidy.on(console.log.bind(console));

        //var printCurrentTrack = function (track) {
        //mopidy.close();
        //};

        //console.log('Playing Radio');

        mopidy.tracklist.clear()
            .then(mopidy.tracklist.add(null, 0, yt_url))
            .then(mopidy.playback.play())
            .catch(console.error.bind(console))
            .done();




    });

    res.send('200');
})

router.get('/stop', function(req, res) {
    console.log('Radio Requested');
    res.json({ message: 'stopping audio' });

    mopidy.connect();
    //mopidy.on(console.log.bind(console));

    mopidy.playback.stop();
    mopidy.off();
})

module.exports = router
