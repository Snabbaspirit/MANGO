import { Deal } from './../shared/types';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { createDataBase } from "./db";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  
const db = createDataBase();
// const event = new EventTarget();
  io.on("connection", (socket) => {

    // Get data from client
    socket.on('message', (dataFromCLient: Deal) => {
        const {id, date, value} = dataFromCLient;
        // And set it to the DB
        db.set(id, {date, value});
        console.log('data set, dsds, fff')
    });

    // Listen to getTradeData from client
    socket.on('getTradeData', () => {
      const allDBData = db.JSON();
      // Return all DB values
      socket.emit('dataFromServer', allDBData);
  });

    // Listen to delete msg and remove item from db
    socket.on('removeSingleTrade', (k: string) => {
      db.delete(k);
    })

});

httpServer.listen(port, () => {
    console.log('The server started on port', port);
});