import { Server } from "socket.io";
import User from "./models/user";

let socketOn: boolean = false;

export const StartSocket = () => {
  if (!socketOn) {
    console.log("Starting socket...");
    
    const io = new Server(5001, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      }
    });

    io.on('connection', async (socket) => {
      console.log('New client connected');
      
      socket.on('userDetails', async (userData) => {
        try {
          const userDetails = userData;
          
          const user = await User.find({ username: userDetails.username });
          const missiles = user[0].missiles;
          socket.emit('missilesData', missiles); 
        } catch (error) {
          console.error('Error fetching missiles data:', error);
        }
      });

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
    });

    socketOn = true;
  }
};













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

