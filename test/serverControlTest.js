"use strict";
var assert = require("assert");
var should = require("should");
var sinon = require("sinon");
var proxyquire = require("proxyquire");
var mpc_commandsStub = {
    connect : function() {
        this.callCounters["connect"]++;
        this.connected = true;
        this.connectParams = arguments;
        //console.log("connect")
    },
    disconnect : function() {
        this.callCounters["disconnect"]++;
        this.disconnected = true;
    },
    getStatus : function() {
        this.callCounters["getStatus"]++;
    },
    getStats : function() {
        this.callCounters["getStats"]++;
    },
    callCounters : {
        "connect" : 0,
        "disconnect" : 0,
        "getStatus" : 0,
        "getStats" : 0
    },
    connected : null,
    disconnected : null,
    connectParams : []
};

var serverControl = proxyquire("../lib/serverControl", { "./mpc_commands": mpc_commandsStub });



describe("With serverControl.handleInput", function() {
    let callback = function() {};
    let okResult = {
        status : "ok",
        message : ""
    };
    let nokResult = {
        status : "nok",
        message : ""
    };

    describe("When given no command", function() {
        it("should give error object", function () {
            nokResult.message = "No command given";
            let actualResult = serverControl.handleInput([], callback);
            assert.deepEqual(actualResult, nokResult);
        });
    });

    describe("When given unknown command", function() {
        it ("should give error object", function() {
            nokResult.message = "Unknown command";
            let actualResult = serverControl.handleInput(["garbage"], callback);
            assert.deepEqual(actualResult, nokResult);
        });
    });

    describe("When given connect", function() {
        it ("should connect to default", function() {
            const expectedHost = "192.168.1.6";
            const expectedPort = 6600;
            let actualResult = serverControl.handleInput(["connect"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.connectParams[0], expectedPort);
            assert.equal(mpc_commandsStub.connectParams[1], expectedHost);
        });

        it("should connect to specified host and port", function() {
            const expectedHost = "127.0.0.1";
            const expectedPort = 1234;


            let actualResult = serverControl.handleInput(["connect", expectedHost, expectedPort], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.connectParams[0], expectedPort);
            assert.equal(mpc_commandsStub.connectParams[1], expectedHost);
        });


    });
    describe("When given disconnect", function() {
        it("should disconnect", function() {
            const expectedState = true;
            let actualResult = serverControl.handleInput(["disconnect"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.disconnected, expectedState);
        });
    });

    describe("When given status", function() {
        it ("should call getStatus()", function() {
            const expectedCallCount = 1;
            let actualResult = serverControl.handleInput(["status"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.callCounters["getStatus"], expectedCallCount);
        });
    });

    describe("When given stats", function() {
        it ("should call getStats()", function() {
            const expectedCallCount = 1;
            let actualResult = serverControl.handleInput(["stats"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.callCounters["getStats"], expectedCallCount);
        });
    });

    describe("When given quit", function() {
        it ("should call disconnect()", function() {
            mpc_commandsStub.callCounters["disconnect"] = 0;
            const expectedCallCount = 1;
            let actualResult = serverControl.handleInput(["quit"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.callCounters["disconnect"], expectedCallCount);
        });

    });

    describe("When given exit", function() {
        it ("should call disconnect()", function() {
            mpc_commandsStub.callCounters["disconnect"] = 0;
            const expectedCallCount = 1;
            let actualResult = serverControl.handleInput(["exit"], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(mpc_commandsStub.callCounters["disconnect"], expectedCallCount);
        });
    });
});
