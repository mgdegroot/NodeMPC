"use strict";
var assert = require("assert");
var should = require("should");
var connection = require("../lib/connection");
var sinon = require("sinon");
//var fakeConnection = {
//    connect: function(port, host, callback, onConnect, onClose, onError, onData) {
//        this.isConnectedValue = true;
//    },
//
//    isConnected: function() {
//        return this.isConnectedValue;
//    },
//    write: function(data) {
//        this.lastDataInWrite = data;
//    },
//    isConnectedValue: null,
//    lastDataInWrite: null
//
//};


//var expectRequire = require("a").expectRequire;

//expectRequire("./connection").return(fakeConnection);
//require("../lib/mpc_commands");
var mpc_commands = require("../lib/mpc_commands");

describe("mpc_commands", function() {
    var host = "host";
    var port = 1000;
    var callback = function() { };

    describe("When called connect", function() {
        it ("should connect", function() {
            var connectStub = sinon.stub(connection, "connect", function() {});
            var isConnectedStub = sinon.stub(connection, "isConnected", function() {return true; });
            mpc_commands.connect(port, host, callback);
            assert.equal(mpc_commands.isConnected(), true);
        });
    });

    describe("When sending commands", function() {
        var actualData;
        var writeStub = sinon.stub(connection, "write", function(data) {actualData = data; });

        it ("should send currentsong command", function() {
            const expectedWrite = "currentsong\n";
            mpc_commands.getCurrentSongInfo();
            assert.equal(actualData, expectedWrite);
        });
        it ("should send play command", function() {
            const expectedWrite = "play\n";
            mpc_commands.play();
            assert.equal(actualData, expectedWrite);
        });
        it ("should send pause command", function() {
            const expectedWrite = "pause 1\n";
            mpc_commands.pause();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send random command", function() {
            let expectedWrite = "random 1\n";
            mpc_commands.toggleRandom();
            assert.equal(actualData, expectedWrite);

            expectedWrite = "random 0\n";
            mpc_commands.toggleRandom();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send stop command", function() {
            const expectedWrite = "stop\n";
            mpc_commands.stop();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send next command", function() {
            const expectedWrite= "next\n";
            mpc_commands.next();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send previous command", function() {
            const expectedWrite= "previous\n";
            mpc_commands.previous();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send setvol 60 command", function() {
            const expectedWrite= "setvol 60\n";
            mpc_commands.setVolume(60);
            assert.equal(actualData, expectedWrite);
        });

        it ("should send setvol 55 command", function() {
            const expectedWrite= "setvol 55\n";
            mpc_commands.evalExpr("currentAudioVolume = 50");
            mpc_commands.volumeInc();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send setvol 45 command", function() {
            const expectedWrite= "setvol 45\n";
            mpc_commands.evalExpr("currentAudioVolume = 50");
            mpc_commands.volumeDec();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send status command", function() {
            const expectedWrite= "status\n";
            mpc_commands.getStatus();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send stats command", function() {
            const expectedWrite= "stats\n";
            mpc_commands.getStats();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send playlistinfo command", function() {
            const expectedWrite= "playlistinfo\n";
            mpc_commands.getCurrentPlaylist();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send close command", function() {
            const expectedWrite= "close\n";
            mpc_commands.disconnect();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send listdir command", function() {
            const expectedWrite= "listall\n";
            mpc_commands.listdir();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send listdir directory command", function() {
            const expectedWrite= "listall directory\n";
            mpc_commands.listdir("directory");
            assert.equal(actualData, expectedWrite);
        });

        it ("should send update command", function() {
            const expectedWrite= "update\n";
            mpc_commands.update();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send update directory command", function() {
            const expectedWrite= "update directory\n";
            mpc_commands.update("directory");
            assert.equal(actualData, expectedWrite);
        });

        it ("should send listplaylists command", function() {
            const expectedWrite= "listplaylists\n";
            mpc_commands.list();
            assert.equal(actualData, expectedWrite);
        });

        it ("should send clear and load command", function() {
            let expectedWrite= "clear\n";
            mpc_commands.loadPlaylist("test");
            assert.equal(actualData, expectedWrite);
            mpc_commands.evalExpr("internalCommandCallback = function(){};");
            mpc_commands.loadPlaylist();
            expectedWrite = "load test\n";
            assert.equal(actualData, expectedWrite);
        });

        it ("should send clear command", function() {
            const expectedWrite= "clear\n";
            mpc_commands.clearPlaylist();
            assert.equal(actualData, expectedWrite);
        });

        //it ("should send search command", function() {
        //    const expectedWrite= "search any searchterm\n";
        //    mpc_commands.searchDatabase("searchterm");
        //    assert.equal(actualData, expectedWrite);
        //});

        it ("should send save command", function() {
            const expectedWrite= "save playlistname\n";
            mpc_commands.savePlaylist("playlistname");
            assert.equal(actualData, expectedWrite);
        });



        it ("should test eval", function() {
            mpc_commands.evalExpr("currentAudioVolume = 80");
            var result = mpc_commands.evalExpr("currentAudioVolume;");
            assert.equal(result, 80);

            assert.equal(process.env.NODE_ENV, "test");
        });
    });


});
