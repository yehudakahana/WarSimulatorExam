import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';  

const router = express.Router();

//seed route


// ראוט לרישום משתמש
router.post('/register', registerUser);

// ראוט להתחברות
router.post('/login', loginUser);

export default router;


