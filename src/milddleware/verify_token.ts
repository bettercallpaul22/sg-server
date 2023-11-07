import jwt from 'jsonwebtoken'





export const verify = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
            if (err) { return res.status(401).json('invalid or expired token') }
            req.user = user
            next()
        })
    } else {
        res.status(401).json("No token found, please login")
    }

}
