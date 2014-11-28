var proxyquire = require("proxyquire");
var assert = require("assert");
var sinon = require("sinon");
//var mpc_commands = require("../mpc_commands");
//var serverControl = require("../serverControl");
var mpc_commands_stub = { };

var serverControl = proxyquire("../serverControl", { "mpc_commands" : mpc_commands_stub });
mpc_commands_stub.sendString = function(var1, var2) { };
mpc_commands_stub.connect = function(var1, var2, var3) {};


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
            //mpc_commands_stub.sendString("", "");
            //mpc_commands_stub.savePlaylist("test");
            //let stub = sinon.stub(mpc_commands, "sendString");
            //mpc_commands.savePlaylist("test");
            let expectedResult = {
                status: "ok",
                message: ""
            };
            serverControl.handleServerInput(["connect"], function() {});

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



