import { Request, Response } from "express";
import { UserModel } from "../model/UserModel";
// import { UserModel } from "../model/UserModel";



// GET ALL USERS
export const all_users = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find().select('-password');
            return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const profile = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const user = await UserModel.findById({ _id: _id }).select('-password');
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const get_me = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const user = await UserModel.findById({ _id: _id }).select('-password');
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
        const { _id } = req.params
        const current_user = await UserModel.findOne({_id})
        if(current_user._id.toString() !== req.user._id) return res.status(401).json('forbidden you are not allow to update this user')
        const user = await UserModel.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        await user.save();

        return res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json(error);
    }
}