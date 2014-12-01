var assert = require("assert");
//var requireFrom = require("require-from");

var fakeNet = {
    Socket : function() {
        var that = this;

        that.connect = function(port, host, onConnect) {

        };
        that.write = function(data) {
            console.log(data);
            dataToSend = data;
        };
        that.on = function(event, handler) {

        };
    }
};

var expectRequire = require("a").expectRequire;

expectRequire("net").return(fakeNet);

var mpc_commands = require("../lib/mpc_commands");

var dataToSend;

describe("mpc_commands", function() {
    describe("connect", function() {
        it ("should connect", function() {
            var host = "host";
            var port = 1000;
            var callback = function() { };
            mpc_commands.connect(port, host, callback);
            var iets = mpc_commands._private.commandCallback;
            assert.equal(iets, callback);
            //assert.deepEqual(iets, callback);
            //var tt = requireFrom("members", mpc_commands, "./lib/mpc_commands.js").private_test;
            //console.log(tt);
            //var privateStuff = requireFrom("members", mpc_commands, "./lib/mpc_commands.js").commandCallback;
            //console.dir(privateStuff);
        });
    });

    describe("get current song info", function() {
        it ("should send currentsong command", function() {

        })
    })
});
