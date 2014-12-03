"use strict";
var assert = require("assert");
var should = require("should");
var sinon = require("sinon");
var proxyquire = require("proxyquire");
var databaseControl = require("../lib/databaseControl");
var mpc_commands = require("../lib/mpc_commands");

describe("With databaseControl.handleInput", function() {
    let callback = function() {};
    const okResult = {
        status : "ok",
        message : ""
    };
    let nokResult = {
        status : "nok",
        message : ""
    };

    var rxSearchTerm = null;


    describe("When given no command", function() {
        it("should give error object", function () {
            nokResult.message = "No command given";
            let actualResult = databaseControl.handleInput([], callback);
            assert.deepEqual(actualResult, nokResult);
        });
    });

    describe("When given unknown command", function() {
        it ("should give error object", function() {
            nokResult.message = "Unknown command";
            let actualResult = databaseControl.handleInput(["garbage"], callback);
            assert.deepEqual(actualResult, nokResult);
        });
    });

    describe ("When given search with arguments", function() {
        it ("should call searchDatabase", function() {
            var mpcStub = sinon.stub(mpc_commands, "searchDatabase", function(searchTerm){
                rxSearchTerm = searchTerm;
            });
            const expected = "testterm";
            var actualResult = databaseControl.handleInput(["search", expected], callback);
            assert.deepEqual(actualResult, okResult);
            assert.equal(rxSearchTerm, expected);
            mpcStub.restore();
        });
    });
    describe ("When given search without arguments", function() {
        it ("should give error", function() {
            nokResult.message = "search requires term";

            var actualResult = databaseControl.handleInput(["search"], callback);

            assert.deepEqual(actualResult, nokResult);
        });
    });
});
