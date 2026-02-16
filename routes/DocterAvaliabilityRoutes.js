import express from 'express';
import { avaliabilityController, deleteAvaliablityController, docterAvalabilitylists } from '../controler/doctorAvaliabilityController.js';
export const docterAvalabilityRouter=express.Router();
docterAvalabilityRouter.post("/avaliabilityController/:doctorId",avaliabilityController)
docterAvalabilityRouter.delete("/doctorAvaliability/:id",deleteAvaliablityController)
docterAvalabilityRouter.get("/doctorAvaliability/:id",docterAvalabilitylists)