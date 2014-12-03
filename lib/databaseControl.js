"use strict";

const mpc_commands = require("./mpc_commands");

exports.handleInput = function(tokens) {
    var result = {
        status: "ok",
        message: ""
    };
    console.log("----- database -----");

    if (tokens.length > 0) {
        switch(tokens[0]) {
            case "search":
            {
                if (tokens.length < 2) {
                    result.status = "nok";
                    result.message = "search requires term";
                    console.log(result.message);
                    return result;
                }
                mpc_commands.searchDatabase(tokens[1]);
                break;
            }
            default:
                result.status = "nok";
                result.message = "Unknown command";
                console.log(result.message);
                break;
        }
    }
    else {
        result.status = "nok";
        result.message = "No command given";
        console.log(result.message);
    }

    return result;
};
