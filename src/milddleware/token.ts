import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'






export const createAccessToken = (user: any) => {
    const accessToken = jwt.sign({  
      _id:user._id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      mobile_number:user.mobile_number,}, process.env.TOKEN_SECRET, { expiresIn: '50m' })
    return accessToken
}



export const createRefreshToken = (user: any) => {
    const refreshToken = jwt.sign({
      _id:user._id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      mobile_number:user.mobile_number,
     
    },process.env.TOKEN_SECRET, { expiresIn: '5d' })

    return refreshToken
}


