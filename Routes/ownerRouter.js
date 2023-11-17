import express from 'express';
import { RegisterCheck,RegisterOwner,loginCheck,ownerLogin,ownerAddBus } from '../controller/owner/ownerController.js';
import { verifyToken } from '../middleware/auth.js';
const router= express.Router();

router.post('/register-check',RegisterCheck);
router.post('/register',RegisterOwner);
router.post('/login-check',loginCheck);
router.post('/login',ownerLogin);
router.post('/add-bus',verifyToken,ownerAddBus)



export default router;