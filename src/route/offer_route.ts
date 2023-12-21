import express from "express";
import { create_cash_offer, create_trade_offer, get_user_offers_sent } from "../controller/offer";

export const router = express.Router()
router.get('/all', get_user_offers_sent) 
router.post('/cash-offer/:customer_id', create_cash_offer) 
router.post('/trade-offer/:customer_id', create_trade_offer) 
 