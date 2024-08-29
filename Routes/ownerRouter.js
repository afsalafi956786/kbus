import express from 'express';
const router= express.Router();
import { verifyToken } from '../middleware/auth.js'
import { ownerRegister,ownerLogin,ownerforgotPassoword }  from '../controller/owner/owner.js';
import { ownerStartBus,addBusDetails,addRootes,getOneBusdetails,getOwnerbuses}  from '../controller/owner/bus.js'



router.post('/register',ownerRegister);
router.post('/login',ownerLogin);
router.post('/forgot-password',ownerforgotPassoword);


//link bus
router.post('/start-bus',ownerStartBus)

//add bus , root
router.post('/add-bus',verifyToken,addBusDetails);
router.post('/add-root/:busId',verifyToken,addRootes);

//get bus
router.get('/get-bus/:busId',getOneBusdetails);
router.get('/get-bus',verifyToken,getOwnerbuses)
export default router;