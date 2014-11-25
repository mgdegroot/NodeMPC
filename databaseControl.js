"use strict";

const mpc_commands = require("./mpc_commands");

exports.handleDatabaseInput = function(tokens) {
    console.log("----- database -----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            case "search":
                break;
            default:
                break;
        }
    }
};
