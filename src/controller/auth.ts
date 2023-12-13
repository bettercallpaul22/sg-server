import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { UserModel } from "../model/UserModel";
import { createAccessToken, createRefreshToken } from "../milddleware/token";
import TokenModel from "../model/TokenModel";
import { z } from 'zod'
import { login_schema, register_schema } from "../milddleware/input_validation";





// Register
export const register = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const result: any = register_schema.safeParse(req.body)
        console.log(result)
        if (!result.success) return res.status(401).json(`${result.error.issues[0]['message']}`)
        const {
            firstName,
            lastName,
            email,
            gender, 
            city,
            state,
            country,
            avatar,
            skills,
            mobile_number,
            bvn,
            bank_number,
            guarantor_name,
            guarantor_number,
            bank_name,
            Skill_summary,
            password,
        } = req.body

        const salt = bcrypt.genSaltSync(10)
        const hPassword = bcrypt.hashSync(password, salt)
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json("Email already exists")
        } else {
            const user = new UserModel({
                firstName,
                lastName,
                userName: email.split("@")[0],
                email,
                gender,
                city,
                state,
                country,
                avatar,
                skills,
                mobile_number,
                bvn,
                bank_number,
                guarantor_name,
                guarantor_number,
                bank_name,
                Skill_summary,
                password: hPassword
            })
            await user.save()
            const token = createAccessToken(user)
            const refreshToken = createRefreshToken(user)
            await TokenModel.deleteOne({ userId: user._id })
            new TokenModel({ userId: user._id, token: refreshToken, user }).save()
            res.cookie('jwt_token', refreshToken, {
                httpOnly: true, // accesible only by web browser
                secure: true, //https
                sameSite: 'none', // cross-site cookie
                maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time set to match token
            })

            return res.status(201).json({
                _id: user._id,
                user,
                success: true,
                token,
            })


        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}







// Login
export const login = async (req: Request, res: Response) => {

    try {
        const result: any = login_schema.safeParse(req.body)
        if (!result.success) return res.status(401)
            .json(`${result.error.issues[0]['message']}`)
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json("Email doesn't exist")
        } else {
            const encrypt_password = bcrypt.compareSync(password, user.password)
            if (encrypt_password) {
                const token = createAccessToken(user) as string
                const refreshToken = createRefreshToken(user) as string
                await TokenModel.deleteOne({ userId: user._id })
                new TokenModel({ userId: user._id, token: refreshToken, user }).save()
                res.cookie('jwt_token', refreshToken, {
                    httpOnly: true, // accesible only by web browser
                    secure: true, //https
                    sameSite: 'none', // cross-site cookie
                    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time set to match token
                })

                return res.status(200).json({
                    user,
                    _id: user._id,
                    success: true,
                    token,
                })
            } else {
                return res.status(401).json("Password is incorrect")
            }

        }

    } catch (error) {
        if (error.name === 'ZodError') {
            res.status(401).json(error.issues[0].message)
        } else {

            res.status(500).json(error.message)
        }

    }
}



export const refresh_token = async (req: Request, res: Response) => {
    try {
        const token = await TokenModel.find()
        res.send(token)
    } catch (error) {
        res.status(500).json(error.message)

    }
}