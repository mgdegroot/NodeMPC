var assert = require("assert");
//var sinon = require("sinon");
var should = require("should");
//var requireFrom = require("require-from");

//var fakeNet = {
//    Socket : function() {
//        var that = this;
//
//        that.connect = function(port, host, onConnect) {
//            tt = "bbbbb";
//        };
//        that.write = function(data) {
//            console.log(data);
//            dataToSend = data;
//        };
//        that.on = function(event, handler) {
//            console.log("called....");
//        };
//    }
//};

var fakeConnection = {
    connect: function(port, host, callback, onConnect, onClose, onError, onData) {
        //console.log("fake.connect");
        this.isConnectedValue = true;
    },

    isConnected: function() {
        return this.isConnectedValue;
    },
    write: function(data) {
        this.lastDataInWrite = data;
        //console.log("fake.write: " + data);
    },
    isConnectedValue: null,
    lastDataInWrite: null

};


var expectRequire = require("a").expectRequire;

//expectRequire("net").return(fakeNet);
expectRequire("./connection").return(fakeConnection);
require("../lib/mpc_commands");
var mpc_commands = require("../lib/mpc_commands");

describe("mpc_commands", function() {
    var host = "host";
    var port = 1000;
    var callback = function() { };

    describe("dummy", function() {
        it("does dummy", function() {
            //console.dir(mpc_commands.test.that.commandCallback);

        });
    });
    describe("connect", function() {
        it ("should connect", function() {
            mpc_commands.connect(port, host, callback);
            assert.equal(mpc_commands.isConnected(), true);
        });
    });

    describe("send commands", function() {
        it ("should send currentsong command", function() {
            var expectedWrite = "currentsong\n";
            mpc_commands.getCurrentSongInfo();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });
        it ("should send play command", function() {
            var expectedWrite = "play\n";
            mpc_commands.play();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });
        it ("should send pause command", function() {
            var expectedWrite = "pause 1\n";
            mpc_commands.pause();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send random command", function() {
            var expectedWrite = "random 1\n";
            mpc_commands.toggleRandom();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);

            expectedWrite = "random 0\n";
            mpc_commands.toggleRandom();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send stop command", function() {
            var expectedWrite = "stop\n";
            mpc_commands.stop();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send next command", function() {
            var expectedWrite = "next\n";
            mpc_commands.next();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send previous command", function() {
            var expectedWrite = "previous\n";
            mpc_commands.previous();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send setvol 60 command", function() {
            var expectedWrite = "setvol 60\n";
            mpc_commands.setVolume(60);
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send setvol 55 command", function() {
            var expectedWrite = "setvol 55\n";
            mpc_commands.evalExpr("currentAudioVolume = 50");
            mpc_commands.volumeInc();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send setvol 45 command", function() {
            var expectedWrite = "setvol 45\n";
            mpc_commands.evalExpr("currentAudioVolume = 50");
            mpc_commands.volumeDec();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send status command", function() {
            var expectedWrite = "status\n";
            mpc_commands.getStatus();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send stats command", function() {
            var expectedWrite = "stats\n";
            mpc_commands.getStats();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send playlistinfo command", function() {
            var expectedWrite = "playlistinfo\n";
            mpc_commands.getCurrentPlaylist();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send close command", function() {
            var expectedWrite = "close\n";
            mpc_commands.disconnect();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send listdir command", function() {
            var expectedWrite = "listall\n";
            mpc_commands.listdir();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send listdir directory command", function() {
            var expectedWrite = "listall directory\n";
            mpc_commands.listdir("directory");
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send update command", function() {
            var expectedWrite = "update\n";
            mpc_commands.update();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send update directory command", function() {
            var expectedWrite = "update directory\n";
            mpc_commands.update("directory");
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send listplaylists command", function() {
            var expectedWrite = "listplaylists\n";
            mpc_commands.list();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send clear and load command", function() {
            var expectedWrite = "clear\n";
            mpc_commands.loadPlaylist("test");
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
            mpc_commands.evalExpr("internalCommandCallback = function(){};");
            mpc_commands.loadPlaylist();
            expectedWrite = "load test\n";
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send clear command", function() {
            var expectedWrite = "clear\n";
            mpc_commands.clearPlaylist();
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send save command", function() {
            var expectedWrite = "save playlistname\n";
            mpc_commands.savePlaylist("playlistname");
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should send search command", function() {
            var expectedWrite = "search any searchterm\n";
            mpc_commands.searchDb("searchterm");
            assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

        it ("should test evel", function() {
            //var expectedWrite = "update\n";
            mpc_commands.evalExpr("currentAudioVolume = 80");
            var res = mpc_commands.evalExpr("currentAudioVolume");
            console.log(res);
            //assert.equal(fakeConnection.lastDataInWrite, expectedWrite);
        });

    });


});
