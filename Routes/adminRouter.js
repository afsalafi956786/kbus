import express from 'express';
const router= express.Router();
import { createAdmin,AdminLogin,AdminDetails } from '../controller/Admin/adminController.js';
import { getAllBus,getAllNotification } from '../controller/Admin/busController.js'
import { verifyToken } from '../middleware/auth.js'


router.post('/create',createAdmin);
router.post('/login',AdminLogin);
router.get('/admin-data',verifyToken,AdminDetails)


//bus
router.get('/get-bus',verifyToken,getAllBus)

//notification
router.get('/get-notification',verifyToken,getAllNotification)
export default router