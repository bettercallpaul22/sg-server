// import  verify  from '../validation/tokenValidation';
import {verify} from '../milddleWare/tokenValidation';
import { getAllUsers, getMe, getProfile, remove, update, updateSkill } from '../controller/userController';
import express from 'express';

const router = express.Router() 

router.get('/all', getAllUsers)
router.get('/profile/:id', verify, getProfile)
router.get('/get-me/:id', verify, getMe)
router.delete('/delete/:id', verify, remove)
router.put('/update/:id', update)
router.put('/update-skill/:id', verify,  updateSkill)
 
export default router;