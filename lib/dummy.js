var net = require("net");
var socket = new net.Socket();
exports.connect = function(port, host, callback) {
//    socket.keepAlive(true);
    socket.connect(port, host, onConnect);
    //socket.on("data", onData);
    //socket.on("close", onClose);
    //socket.on("error", onError);
    //commandCallback = callback;
};

exports.write = function(data) {
    socket.write(data);
};

var onConnect = function() {
    console.log("connect");
};

var onData = function(data) {
    console.log("data");
};

var onClose = function() {
    console.log("close");
};

var onError = function(error) {
    console.log("error");
};
