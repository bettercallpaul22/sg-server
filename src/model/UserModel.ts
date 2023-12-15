import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: String,
    userName: String,
    gender: String,
    city: String,
    state: String,
    country: String,
    bio:String,
    credit:Number,
    verified:Boolean,

},
    { timestamps: true }

)

export const UserModel = mongoose.model('users', UserSchema)