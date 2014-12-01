const net = require("net");

var socket = new net.Socket();

var commandCallback;

exports.isConnected = function() {
    return !!socket; //&& socket.isConnected();
};

exports.connect = function(port, host, callback, onConnect, onClose, onError, onData) {
    commandCallback = callback;
    socket.connect(port, host, onConnect);
    socket.on("data", onData);
    socket.on("close", onClose);
    socket.on("error", onError);
};

exports.write = function(data) {
    if (!socket) {
        throw new Error("Socket is gesloten...");
    }

    socket.write(data);
};

exports.getSocket = function() {
    return socket;
};
