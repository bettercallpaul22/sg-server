import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { UserModel } from '../schema/userModel';
import bcrypt from 'bcrypt'
import { updateSchema } from '../milddleWare/joiSchema';
import { createAccessToken } from "../milddleWare/tokenValidation"




// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get me
export const getProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById({ _id: id }).select('-password');
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }
}
// Get me
export const getMe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById({ _id: id }).select('-password');
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }
}


// Update Profile
export const update = async (req: any, res: Response) => {
    try {
        // const { error } = updateSchema.validate({ firstName: req.body.firstName, lastName: req.body.lastName });
        // if (error) return res.status(400).json(error.details[0].message);
        // if (req.params.id !== req.user._id) return res.status(401).json('You are not allowed to update this user')
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        await user.save();
        const token = createAccessToken(user)

        return res.status(200).json({ success: true, user, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
// Update Profile
export const updateSkill = async (req: any, res: Response) => {
    // console.log("user",re)
const {id} = req.params;
    try {
       
        // const { error } = updateSchema.validate({
        //     state: req.body.state,
        //     skills: req.body.skills,
        //     avatar: req.body.avatar,
        //     bvn: req.body.bvn,
        //     bank_number: req.body.bank_number,
        //     guarantor_name: req.body.guarantor_name,
        //     guarantor_number: req.body.guarantor_number,
        //     bank_name: req.body.bank_name,
        //     Skill_summary: req.body.Skill_summary,
        // });
        // if (error) return res.status(400).json(error.details[0].message);
        // if (req.params.id !== req.user._id) return res.status(401).json('You are not allowed to update this user')
        const user = await UserModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
            )
            // console.log("user", user)
            await user.save();
            const token = createAccessToken(user)
        return res.status(200).json({ success: true, user, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}







// Delete Profile
export const remove = async (req: any, res: Response) => {
    console.log(req.user._id)
    try {
        if (req.user._id !== req.params.id) {
            res.status(401).json("you are not allowed to delete this user")
        } else {
            return res.status(200).json("user deleted successfully");

        }
        // const { id } = req.params
        // const user = await UserModel.findByIdAndDelete(id)
        // if(user){
        //     return res.status(200).json({success:true});
        // }else{return res.status(404).json(null);}


    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }
}
