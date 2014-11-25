"use strict";

var mpc_commands = require("./mpc_commands");

exports.handleServerInput = function(tokens, commandCallback) {
    console.log("----- server -----");
    var host = "192.168.1.6", port = 6600;

    if (tokens.length > 0) {
        switch (tokens[0]) {
            case "connect":
                if (tokens.length > 1) {
                    host = tokens[1];
                }
                if (tokens.length > 2) {
                    port = parseInt(tokens[2], 10);
                }
                mpc_commands.connect(port, host, commandCallback);
                break;
            case "disconnect":
                mpc_commands.disconnect();
                break;
            case "status":
                mpc_commands.getStatus();
                break;
            case "stats":
                mpc_commands.getStats();
                break;
            case "quit":
            case "exit":
                mpc_commands.disconnect();
                process.exit(0);
                break;
            default:
                console.log("Unknown entry for srv. Enter valid command.");
                break;
        }
    }
};
