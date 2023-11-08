import express from "express";
import { update, profile, get_me, all_users } from "../controller/user";
import { verify } from "../milddleware/verify_token";

export const router = express.Router()
// router.post('/get', register)
router.get('/all', all_users) 
router.put('/update/:_id', verify, update) 
router.get('/profile/:_id', profile) 
router.get('/get-me/:_id', get_me) 