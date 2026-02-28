import express from 'express'
import {  GetSpecialization, GetSpecializationInONeDivistion } from '../controler/SpecialaizationController.js';
export const specializationsRouter=express.Router();
specializationsRouter.get("/specializations",GetSpecialization);
specializationsRouter.get("/SpecializationByDivistion/:id",GetSpecializationInONeDivistion)