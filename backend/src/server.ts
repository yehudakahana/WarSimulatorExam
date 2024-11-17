

import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRouter';
import connectDB from './DAL/data';
import { verifyToken } from './middleware/authMiddleware'; 
import dotenv from 'dotenv';
import {StartSocket} from './socket';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// חיבור ל-MongoDB
connectDB();

//פתיחת סוקט
StartSocket();


// חיבור לראוטים
app.use('/api', authRoutes);  


// //@ts-ignore
// app.use('/api', verifyToken); 

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





