import express from 'express'
import { addDocter, deleteDocter, editDocter, getAllDocters, getDocter } from '../controler/doctersController.js';
export const docterRouter=express.Router();
docterRouter.post("/docter",addDocter);
docterRouter.get("/docter",getAllDocters)
docterRouter.get("/docter/:id",getDocter)
docterRouter.put("/docter/:id",editDocter)
docterRouter.delete("/docter/:id",deleteDocter)