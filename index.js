"use strict";
//const mpc_commands = require("./mpc_commands");
const globalControl = require("./lib/globalControl");
const playbackControl = require("./lib/playbackControl");
const serverControl = require("./lib/serverControl");
const playlistControl = require("./lib/playlistControl");
const databaseControl = require("./lib/databaseControl");
var mpcStatus = {};
var mpcStatistics = {};

//class MpcStatus {
//    get volume() {
//        return this._volume;
//    }
//
//    set volume(newVolume) {
//        this._volume = newVolume;
//    }
//};


var commandCallback = function(command, data) {
    let lines = "";
    console.log("%s response: %s", command, data ? data.toString() : "");
    switch(command) {
        case "status":
            lines = data.toString().split("\n");

            for (let i = 0; i < lines.length; i++) {
                let kvp = lines[i].split(":");
                if (kvp.length === 2) {
                    mpcStatus[kvp[0]] = kvp[1].trim();
                }
            }
            console.log(mpcStatus);

            break;
        case "stats":
            lines = data.toString().split("\n");

            for (let i = 0; i < lines.length; i++) {
                let kvp = lines[i].split(":");
                if (kvp.length === 2) {
                    mpcStatistics[kvp[0]] = kvp[1].trim();
                }
            }
            console.log(mpcStatistics);

            break;
    }
    console.log("Enter command:");
    process.stdout.write(">");
};

var onConsoleInput = function() {
    var chunk = process.stdin.read();

    if (chunk !== null) {

        var tokens = chunk.toString().replace("\n", "").split(" ");

        if (tokens.length > 0) {
            switch(tokens[0]) {
                case "srv":
                {
                    let srvTokens = tokens.slice(1);
                    serverControl.handleServerInput(srvTokens, commandCallback);
                    break;
                }
                case "pb":
                {
                    let pbTokens = tokens.slice(1);
                    playbackControl.handlePlaybackInput(pbTokens);
                    break;
                }
                case "list":
                {
                    let listTokens = tokens.slice(1);
                    playlistControl.handlePlaylistInput(listTokens);
                    break;
                }
                case "db":
                {
                    let dbTokens = tokens.slice(1);
                    databaseControl.handleDatabaseInput(dbTokens);
                    break;
                }
                default:
                    //let globalTokens = tokens.slice(1);
                    globalControl.handleGlobalInput(tokens);
                    break;
            }
        }
    }
};

process.stdin.on("readable", onConsoleInput);

console.log("Enter command: ");
process.stdout.write(">");