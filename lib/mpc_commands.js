"use strict";

const net = require("net");

var socket = new net.Socket();
var isConnected = false;
var lastCommandSend = "";
var parameters = "";
var currentAudioVolume = -1;
var commandCallback;
var internalCommandCallback = null;

var isRandomPlayback = false;
var currentPlaylist = "";

//exports._commandCallback = commandCallback;
//module.members = {
//    private_test: "test",
//    commandCallback: null,
//    private_internalCommandCallback: internalCommandCallback
//};


if (process.env.NODE_ENV === "test") {
    module.exports._private = { commandCallback: commandCallback };
}


exports.connect = function(port, host, callback) {
//    socket.keepAlive(true);
    commandCallback = callback;
    socket.connect(port, host, onConnect);
    socket.on("data", onData);
    socket.on("close", onClose);
    socket.on("error", onError);

};

exports.getCurrentSongInfo = function() {
    lastCommandSend = "currentsong";
    sendString(lastCommandSend);
};

exports.play = function() {
    lastCommandSend = "play";
    sendString(lastCommandSend);
};

exports.pauze = function() {
    lastCommandSend = "pause";
    parameters = "1";
    sendString(lastCommandSend, parameters)
};

exports.toggleRandom = function() {
    lastCommandSend = "random";
    isRandomPlayback = !isRandomPlayback;
    parameters = isRandomPlayback ? "1" : "0";
    sendString(lastCommandSend, parameters);
};

exports.stop = function() {
    lastCommandSend = "stop";
    sendString(lastCommandSend);
};

exports.next = function() {
    lastCommandSend = "next";
    sendString(lastCommandSend);
};

exports.previous = function() {
    lastCommandSend = "previous";
    sendString(lastCommandSend);
};

exports.volumeInc = function() {
    currentAudioVolume += 5;
    setVolume(currentAudioVolume);
};

exports.volumeDec = function() {
    currentAudioVolume -= 5;
    setVolume(currentAudioVolume);
};

exports.setVolume = function(level) {
    lastCommandSend = "setvol";
    currentAudioVolume = level;
    sendString(lastCommandSend + " " + currentAudioVolume);
};

exports.getStatus = function() {
    lastCommandSend = "status";
    sendString(lastCommandSend);
};

exports.getStats = function() {
    lastCommandSend = "stats";
    sendString(lastCommandSend);
};

exports.getCurrentPlaylist = function() {
    lastCommandSend = "playlistinfo";
    sendString(lastCommandSend);
};

exports.disconnect = function() {
    lastCommandSend = "close";
    sendString(lastCommandSend);
    //if (isConnected && socket) {
    //    socket.end();
    //}
};

exports.listdir = function(directory) {
    lastCommandSend = "listall ";
    if (directory) {
        lastCommandSend += " " + directory;
    }
    sendString(lastCommandSend);
};

exports.update = function(directory) {
    lastCommandSend = "update";
    if (directory) {
        lastCommandSend += " " + directory;
    }
    sendString(lastCommandSend);
};

///////
// Playlist
//////
exports.list = function() {
    lastCommandSend = "listplaylists";
    sendString(lastCommandSend);
};

exports.loadPlaylist = function(name) {

    if (internalCommandCallback === null) {
        currentPlaylist = name;
        internalCommandCallback = this.loadPlaylist;
        sendString("clear");
    }
    else {
        internalCommandCallback = null;
        lastCommandSend = "load";
        parameters = currentPlaylist;
        sendString(lastCommandSend, parameters);
    }
};

exports.clearPlaylist = function() {
    lastCommandSend = "clear";
    sendString(lastCommandSend);
};

exports.savePlaylist = function(name) {
    lastCommandSend = "save";
    parameters = name;
    sendString(lastCommandSend, parameters);
};

/////////////////////
// database
///////////////////

exports.searchDb = function(searchterm) {
    lastCommandSend = "search";
    parameters = "any " + searchterm;
    sendString(lastCommandSend, parameters);
};



var sendString = function(stringToSend, argumentsToSend) {
    if (!isConnected || !socket) {
        console.log("Error: cannot send over a closed socket.");
        return;
    }

    if (argumentsToSend) {
        stringToSend += " " + argumentsToSend;
    }

    console.log("   <>Sending " + stringToSend);
    socket.write(stringToSend + "\n");
};

var onConnect = function() {
    isConnected = true;
    commandCallback("connected");
};


var onData = function(data) {
    if (lastCommandSend === "") {
        lastCommandSend = "{info}";
    }

    if (internalCommandCallback !== null) {
        internalCommandCallback();
    }
    switch(lastCommandSend) {
        case "volume":
            break;
        case "status":
            //parseStatus(data.toString());
            break;
    }



    commandCallback(lastCommandSend, data);
    lastCommandSend = "";
};

var onClose = function() {
    console.log("Connection closed");
    commandCallback("disconnected");
};

var onError = function(error) {
    console.log("Error: ", error);
};
