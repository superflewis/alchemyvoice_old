var express = require('express'),
    router = express.Router(),
    request = require('request')
search = require('youtube-search');
var Mopidy = require("mopidy");
var mopidy = new Mopidy({
    callingConvention: "by-position-only",
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});












router.post('/', function(req, res) {




    rsource = req.body.rsource;
    rname = req.body.rname;
    console.log(rsource);
    console.log(rname);

    if (rsource == "youtube") {

        console.log("YOUTUBE");

        //yt_url = "yt:https://www.youtube.com/watch?v=Njpw2PVb1c0";
        //console.log(yt_url);

        console.log("from radio.js : " + rname);

        request.post({url: "http://localhost:8090/youtube", form: {findplay: rname}}, function(error, response, body) {  
            //console.log(body);
        });

    }




    if (rsource == "shoutcast") {
        console.log("SHOUTCAST");

        request.get('http://localhost:8090/shoutcast/Music Massage', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var st_url = body;
                //request.post('http://localhost:6680/mopidy/rpc', {"jsonrpc":"2.0","id":1,"method": "core.tracklist.add","params":{"uri":"http://38.107.242.36:8000/stream"}});
                //request.post('http://localhost:6680/mopidy/rpc', {"jsonrpc":"2.0","id":1,"method": "core.playback.play"});
                //mopidy.connect();
                //mopidy.on(console.log.bind(console));

                var printCurrentTrack = function(track) {
                    //mopidy.close();
                };

                console.log('Playing Radio');

                mopidy.tracklist.clear()
                    .then(mopidy.tracklist.add(null, 0, st_url))
                    .then(mopidy.playback.play())
                    .catch(console.error.bind(console))
                    .done(printCurrentTrack);

                //request.post('http://localhost:8090/say', {
                //    form: {
                //        msg: 'Playing station Music Massage.'
                //    }
                //});
            }

        });
    }


    res.send('200');
})

router.get('/stop', function(req, res) {
    console.log('Radio Requested');
    res.json({message: 'stopping audio'});

    mopidy.connect();
    //mopidy.on(console.log.bind(console));

    mopidy.playback.stop();
    mopidy.off();
})

module.exports = router