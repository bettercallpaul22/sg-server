import express from "express";
import { update, profile, get_me } from "../controller/user";
import { verify } from "../milddleware/verify_token";

export const router = express.Router()
// router.post('/get', register)
router.put('/update/:_id', verify, update) 
router.get('/profile/:_id', profile) 
router.get('/get-me/:_id', verify, get_me) 