import express from 'express'
import { verifyJwt } from '../middlewire/verifyJwt.js';
import { addAccount, deleteUser, getUser, getUsers,edituser } from '../controler/userControler.js';
export const userRouter=express.Router();
userRouter.get("/users",getUsers);
userRouter.delete("/user/:id",deleteUser);
userRouter.get("/user/:id",getUser);
userRouter.post('/user',addAccount);
userRouter.put("/user/:id",edituser)

