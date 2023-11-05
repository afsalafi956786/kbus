import express from 'express';
import { ownerRegister,verifyOTP,ownerLogin,verifyLoginOTP,ownerAddBus } from '../controller/owner/ownerController.js';
import { verifyToken } from '../middleware/auth.js';
const router= express.Router();

router.post('/register',ownerRegister);
router.post('/verify-otp',verifyOTP);
router.post('/login',ownerLogin);
router.post('/verify-login',verifyLoginOTP);
router.post('/add-bus',verifyToken,ownerAddBus)



export default router;