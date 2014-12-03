"use strict";
var connection = require("./connection");


var isConnected = false;
var lastCommandSend = "";
var parameters = "";
var currentAudioVolume = -1;
var commandCallback;
var internalCommandCallback = null;

var isRandomPlayback = false;
var currentPlaylist = "";


exports.connect = function(port, host, callback) {
//    socket.keepAlive(true);
    connection.connect(port, host, callback, onConnect, onClose, onError, onData);
};

exports.isConnected = function() {
    return connection.isConnected();
};

exports.getCurrentSongInfo = function() {
    lastCommandSend = "currentsong";
    sendString(lastCommandSend);
};

exports.play = function() {
    lastCommandSend = "play";
    sendString(lastCommandSend);
};

exports.pause = function() {
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
    exports.setVolume(currentAudioVolume);
};

exports.volumeDec = function() {
    currentAudioVolume -= 5;
    exports.setVolume(currentAudioVolume);
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
    lastCommandSend = "listall";
    if (directory) {
        lastCommandSend += " " + directory;
    }
    sendString(lastCommandSend.trim());
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

exports.searchDatabase = function(searchterm) {
    lastCommandSend = "search";
    parameters = "any " + searchterm;
    sendString(lastCommandSend, parameters);
};


//////////////////////
// debug - test
//////////////////////

exports.evalExpr = function(expr) {
    return eval(expr);
};



var sendString = function(stringToSend, argumentsToSend) {
    if (!connection.isConnected()) {
        console.log("Kan niet over gesloten verbinding zenden.");
        return;
    }

    if (argumentsToSend) {
        stringToSend += " " + argumentsToSend;
    }

    //console.log("   <>Sending " + stringToSend);
    connection.write(stringToSend + "\n");
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
