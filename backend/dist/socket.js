"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSocket = void 0;
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./models/user"));
let socketOn = false;
const StartSocket = () => {
    if (!socketOn) {
        console.log("Starting socket...");
        const io = new socket_io_1.Server(5001, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });
        io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('New client connected');
            socket.on('userDetails', (userData) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const userDetails = userData;
                    const user = yield user_1.default.find({ username: userDetails.username });
                    const missiles = user[0].missiles;
                    socket.emit('missilesData', missiles);
                }
                catch (error) {
                    console.error('Error fetching missiles data:', error);
                }
            }));
            socket.on('launchRocket', (data) => {
                io.emit('rocketLaunched', data);
                console.log('Rocket launched:', data);
            });
            socket.on('interceptRocket', (data) => {
                io.emit('rocketIntercepted', data);
                console.log('Rocket intercepted:', data);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        }));
        socketOn = true;
    }
};
exports.StartSocket = StartSocket;
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import Missile from '../src/models/missiles';
// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });
// export const StartSocket = () => {
//     io.on('connection', async (socket) => {
//         console.log('New client connected');
//         // שליחת רשימת טילים לכל מי שמתחבר
//         try {
//           const missiles = await Missile.find(); 
//           socket.emit('missilesData', missiles); 
//         } catch (error) {
//           console.error('Error fetching missiles data:', error);
//         }
//           //שיגור
//         socket.on('launchRocket', (data) => {
//           io.emit('rocketLaunched', data); 
//           console.log('Rocket launched:', data);
//         });
//         // יירוט 
//         socket.on('interceptRocket', (data) => {
//           io.emit('rocketIntercepted', data); 
//           console.log('Rocket intercepted:', data);
//         });
//         socket.on('disconnect', () => {
//           console.log('Client disconnected');
//         });
//       });
// }
// export default io;
