"use strict";

const mpc_commands = require("./mpc_commands");

exports.handleDatabaseInput = function(tokens) {
    console.log("----- database -----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            case "search":
            {
                if (tokens.length < 2) {
                    console.log("search requires term");
                    return;
                }
                mpc_commands.searchDb(tokens[1]);
                break;
            }
            default:
                break;
        }
    }
};
