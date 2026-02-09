import express from 'express'
import { addLocation } from '../controler/locationController.js';
export const locationRouter=express.Router();
locationRouter.post("/Location/:id",addLocation )