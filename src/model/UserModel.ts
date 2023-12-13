import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    avatar: String,
    city: String,
    state: String,
    country: String,
    mobile_number: String,
    product:Array,
},
    { timestamps: true }

)

export const UserModel = mongoose.model('users', UserSchema)