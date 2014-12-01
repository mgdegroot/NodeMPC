var assert = require("assert");
var fakeNet = {

    Socket : function() {
        var that = this;

        that.connect = function(port, host, onConnect) {
            //console.log("port:" + port + ", host: " + host + ", onConnect: " + onConnect);
        };
        that.write = function(data) {
            console.log(data);
            dataToSend = data;
        };
    }
};
var dataToSend;
var expectRequire = require("a").expectRequire;

expectRequire("net").return(fakeNet);

var dummy = require("../lib/dummy");

describe("Server control", function() {
    "use strict";
    describe("Module serverControl", function () {
        it("should do something", function() {
            dummy.connect(1000, "host", "callback");
            //assert.equal(typeof serverControl, "object");
            //assert.equal(typeof serverControl.handleServerInput, "function");
        });

        it("should catch the write", function() {
            //dummy.write("test");
            //console.log("data rx: " + dataToSend);

            //assert.equal(dataToSend, "test");
        });
    });
});


