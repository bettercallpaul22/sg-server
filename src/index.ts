import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { Error } from 'mongoose'
import dotenv from 'dotenv'
import http from "http";
import cookieParser from "cookie-parser"
import { MongoClient, ServerApiVersion } from "mongodb"
import { router as auth_route } from './route/auth'
import { router as user_route } from './route/user'




interface Message {
    serderId: string;
    receipientId: string;
    message: string;
}

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(cookieParser())



app.use(cors({
    origin: ["http://localhost:3000", "https://skill-guardian.vercel.app/"],
    credentials: true,
    allowedHeaders:["Content-type", "authorization"]

}))

const httpServer = http.createServer(app)


httpServer.listen(PORT, () => console.log('app listening on port', PORT))
app.use((req: Request, res: Response, next: NextFunction) => {
    next()
})


mongoose.connect(process.env.DATABASE_URL_MONGO)
    .then(() => console.log('mongoose connected'))
    .catch((err: Error) => console.error(err))


app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Credentials", "true");
response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // res.status(200).json("skillGuardian homepage")
    next();
})



app.use('/', (req, res)=>{
    res.status(200).json("welcom skillGuardian homepage")
})
app.use('/api/auth', auth_route)
app.use('/api/user', user_route) 
