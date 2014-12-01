"use strict";

const mpc_commands = require("./lib/mpc_commands");

exports.handleGlobalInput = function(tokens) {
    console.log("----- global -----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            case "list":
            {
                var directory = "";
                if (tokens.length > 1) {
                    directory = tokens[1];
                }
                mpc_commands.listdir(directory);
                break;
            }
            default:
                console.log("Unknown entry. Enter valid command.");
                break;
        }
    }
};
