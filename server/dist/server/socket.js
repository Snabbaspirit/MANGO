"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const db = (0, db_1.createDataBase)();
// const event = new EventTarget();
io.on("connection", (socket) => {
    // Get data from client
    socket.on('message', (dataFromCLient) => {
        const { id, date, value } = dataFromCLient;
        // And set it to the DB
        db.set(id, { date, value });
        console.log('data set, dsds, fff');
    });
    // Listen to getTradeData from client
    socket.on('getTradeData', () => {
        const allDBData = db.JSON();
        // Return all DB values
        socket.emit('dataFromServer', allDBData);
    });
    // Listen to delete msg and remove item from db
    socket.on('removeSingleTrade', (k) => {
        db.delete(k);
    });
});
httpServer.listen(port, () => {
    console.log('The server started on port', port);
});
