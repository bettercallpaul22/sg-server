import mongoose from "mongoose";
const Schema = mongoose.Schema;


const OfferSchema = new Schema({
    customer:Object,
    product: Object,
    product_id:String,
    price_offered: Number,
    product_name: String,
    product_value: Number,
    product_category: String,
    product_condition: String,
    product_desc: String,
    images:Array,
    type:String,
},
    { timestamps: true }

)

export const OfferModel = mongoose.model('offer', OfferSchema)