import express from 'express';
const router= express.Router();
import { createAdmin,AdminLogin,AdminDetails } from '../controller/Admin/adminController.js';
import { addBusDetails,addRootes,getAllBus } from '../controller/Admin/busController.js'
import { verifyToken } from '../middleware/auth.js'


router.post('/create',createAdmin);
router.post('/login',AdminLogin);
router.get('/admin-data',verifyToken,AdminDetails)


//bus
router.post('/add-bus',verifyToken,addBusDetails);
router.post('/add-root/:busId',verifyToken,addRootes);
router.get('/get-bus',verifyToken,getAllBus)
export default router