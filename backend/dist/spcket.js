"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSocket = void 0;
const socket_io_1 = require("socket.io");
let socketOn = false;
const StartSocket = () => {
    if (!socketOn) {
        console.log("starting socket");
        const io = new socket_io_1.Server(5001, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });
        io.on('connection', (socket) => {
            console.log('User connected');
            socket.on("hello", (msg) => {
                console.log("hello from client function work");
            });
        });
        socketOn = true;
    }
};
exports.StartSocket = StartSocket;
