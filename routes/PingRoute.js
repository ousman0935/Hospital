import express from 'express'
import { pingController } from '../controler/pingController.js';
export const pingRouter=express.Router();
pingRouter.get("/ping",pingController)