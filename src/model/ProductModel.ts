import { number } from "joi";
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    owner_id: String,
    product_name: String,
    product_price: Number,
    product_category: String,
    product_condition: String,
    product_desc: String,
    deal_type: String,
    images:Array,
},
    { timestamps: true }

)

export const ProductModel = mongoose.model('products', ProductSchema)