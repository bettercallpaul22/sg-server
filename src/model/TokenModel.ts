import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
    user:{}
   
},
    { timestamps: true }
)

const TokenModel = mongoose.model('Token', TokenSchema)
export default TokenModel