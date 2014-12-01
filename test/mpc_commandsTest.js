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

    });


});
