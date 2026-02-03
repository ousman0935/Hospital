import express from 'express'
import LoginControler from '../controler/LoginControler.js';
export const LoginRouter=express.Router();
LoginRouter.post("/login",LoginControler);