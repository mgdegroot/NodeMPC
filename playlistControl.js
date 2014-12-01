"use strict";

const mpc_commands = require("./lib/mpc_commands");

exports.handlePlaylistInput = function(tokens) {
    console.log("-----playlist-----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            case "list":
                mpc_commands.list();
                break;
            case "clear":
                mpc_commands.clearPlaylist();
                break;
            case "load":
            {
                if (tokens.length < 2) {
                    console.log("load requires name");
                    return;
                }
                mpc_commands.loadPlaylist(tokens[1]);
                break;
            }
            case "save":
            {
                if (tokens.length < 2) {
                    console.log("save requires name");
                    return;
                }
                mpc_commands.savePlaylist(tokens[1]);
                break;
            }
            default:
                console.log("Unknown entry for list. Enter valid command.");
                break;
        }
    }
};
