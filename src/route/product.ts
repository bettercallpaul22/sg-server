import express from "express";
import { get_all_product, get_product, get_user_products, new_product } from "../controller/product";
import { verify } from "../milddleware/verify_token";

export const router = express.Router()
router.get('/all', get_all_product) 
router.get('/:product_id/:owner_id', get_product) 
router.get('/:owner_id', get_user_products) 
router.post('/new', new_product) 
// router.put('/update/:_id', verify, update) 