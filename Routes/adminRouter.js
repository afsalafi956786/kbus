import express from 'express';
const router= express.Router();
import { createAdmin,AdminLogin } from '../controller/Admin/adminController.js'


router.post('/create',createAdmin);
router.post('/login',AdminLogin)

export default router