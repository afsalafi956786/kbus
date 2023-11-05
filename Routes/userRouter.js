import express from 'express';
const router= express.Router();
import { userRegister,userVerifyOTP,userLogin,userLoginVerify } from '../controller/Users/userController.js';




router.post('/register',userRegister);
router.post('/verify-otp',userVerifyOTP);
router.post('/login',userLogin);
router.post('/verify-login',userLoginVerify)


export default router;