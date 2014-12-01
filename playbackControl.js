"use strict";

const mpc_commands = require("./lib/mpc_commands");

exports.handlePlaybackInput = function(tokens) {
    console.log("----- playback -----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            //case "exit":
            //    process.stdin.removeListener("readable", handlePlaybackInput);
            //    process.stdin.on("readable", onConsoleInput);
            //    break;
            case "play":
                mpc_commands.play();
                break;
            case "pause":
                mpc_commands.pause();
                break;
            case "stop":
                mpc_commands.stop();
                break;
            case "random":
                mpc_commands.toggleRandom();
                break;

            case "i":
                mpc_commands.getCurrentSongInfo();
                break;
            case "p":
                mpc_commands.previous();
                break;
            case "n":
                mpc_commands.next();
                break;
            case "volume":
                if (tokens.length < 2) {
                    console.log("Error: volume requires level.");
                    return;
                }
                mpc_commands.setVolume(parseInt(tokens[1]));
                break;
            default:
                console.log("Unknown entry for pb. Enter valid command.");
                break;
        }
    }
};
