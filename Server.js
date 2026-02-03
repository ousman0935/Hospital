import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { dbConnect } from './config/dbConnect.js'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRoutes.js'
import { LoginRouter } from './routes/loginroute.js'
import { refreshRouter } from './routes/refreshRoute.js'
import cors from 'cors'
import { hospitalsRoutes } from './routes/hospitalsRoutes.js'
import { docterRouter } from './routes/DocterRoutes.js'
import { imageRouter } from './routes/imageRoutes.js'
dotenv.config();
dbConnect();
const app=express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT || 3500;
app.listen(PORT,(err)=>{
    console.log(`server is listing at port ${PORT}`)
})

app.use(refreshRouter);
app.use(userRouter);
app.use(LoginRouter);
app.use(hospitalsRoutes);
app.use(docterRouter);
app.use(imageRouter);
