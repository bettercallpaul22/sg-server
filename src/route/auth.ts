import express from "express";
import { login, refresh_token, register } from "../controller/auth";
export const router = express.Router()

router.post('/register', register)
router.post('/login', login) 
router.get('/refresh-token', refresh_token) 