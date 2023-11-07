import express from "express";
import { login, register } from "../controller/auth";
export const router = express.Router()

router.post('/register', register)
router.post('/login', login) 