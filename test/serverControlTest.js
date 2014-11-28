var proxyquire = require("proxyquire");
var assert = require("assert");
var sinon = require("sinon");
//var mpc_commands = require("../mpc_commands");
//var serverControl = require("../serverControl");
var mpc_commands_stub = { };

var serverControl = proxyquire("../serverControl", { "mpc_commands" : mpc_commands_stub });
mpc_commands_stub.sendString = function(var1, var2) { };



describe("Server control", function() {
    "use strict";
    describe("Module serverControl", function() {

        it("should have a handleServerInput function", function() {
            assert.equal(typeof serverControl, "object");
            assert.equal(typeof serverControl.handleServerInput, "function");
        });

        it("should return nok and message when receiving no input", function() {
            let expectedResult = {
                status: "nok",
                message: "No command given"
            };

            assert.deepEqual(serverControl.handleServerInput(), expectedResult);
        });

        it("should return nok and message when receiving unknown input", function() {
            let expectedResult = {
                status: "nok",
                message: "Unknown entry for src. Enter valid command"
            };

            assert.deepEqual(serverControl.handleServerInput(["bla"]), expectedResult);
        });
        it("should return ok when connect", function() {
            mpc_commands_stub.connect = function(var1, var2, var3) {};

            let expectedResult = {
                status: "ok",
                message: ""
            };
            let actualResult = serverControl.handleServerInput(["connect"], function() {});
            assert.deepEqual(actualResult, expectedResult);

        });

        it("should return ok and connect to host when connect", function() {
            let actualHost,
                actualPort,
                actualCallback;

            let expectedHost = "host",
                expectedPort = 1000,
                expectedCallback = function(){};

            mpc_commands_stub.connect = function(var1, var2, var3) {
                actualPort = var1;
                actualHost = var2;
                actualCallback = var3;
            };

            let expectedResult = {
                status: "ok",
                message: ""
            };
            let actualResult = serverControl.handleServerInput(["connect", expectedHost, expectedPort], expectedCallback);
            assert.deepEqual(actualResult, expectedResult);
            //assert.equal(actualHost, expectedHost);
            assert.equal(actualPort, expectedPort);
            //assert.equal(actualCallback, expectedCallback);

        });


        it("should return ok when disconnect", function() {
            mpc_commands_stub.disconnect = function() {};

            let expectedResult = {
                status: "ok",
                message: ""
            };
            let actualResult = serverControl.handleServerInput(["disconnect"], function() {});

            assert.deepEqual(actualResult, expectedResult);
        });


        //it("is a test", function() {
        //    let test = sinon.stub();
        //    assert.equal(typeof test, "function");
        //});
        //
        //it("is a test 42", function() {
        //    let test = sinon.stub().returns(42);
        //    assert.equal(typeof test, "function");
        //    assert.equal(test(), 42);
        //});
    });
});



