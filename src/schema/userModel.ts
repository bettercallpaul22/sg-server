import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    skillsAndExperience: String,
    gender: String,
    avatar: String,
    skills:String,
    // reviews:[String],
    about: String,
    city: String,
    state: String,
    country: String,
    charges: String,
    bvn: String,
    guarantor_name: String,
    guarantor_number: String,
    mobile_number: String,
    bank_number: String,
    bank_name: String,
    Skill_summary: String,
    password: { type: String, required: true },
},
    { timestamps: true } 

)

export const UserModel = mongoose.model('users', UserSchema)