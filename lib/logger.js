var winston = require("winston");
var MongoDB = require("winston-mongodb").MongoDB;

var winston = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: "debug" }),
        new (winston.transports.File)({ filename: __dirname + "/../logs/app.log", level: "debug" })
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: "../logs/exceptions.log"})
    ]
});

//winston.info("Chill Winston, the logs are being captured 2 ways - console and file");
winston.add(MongoDB, {db:"logtest", level:"debug"});
module.exports = winston;