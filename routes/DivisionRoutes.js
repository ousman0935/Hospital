import express from 'express';
import { addDivision, deleteDivision, getDivisions } 
from '../controler/DivisionController.js';
export const divisionRouter=express.Router();
divisionRouter.get("/divisions",getDivisions);
divisionRouter.post("/division",addDivision);
divisionRouter.delete("/division",deleteDivision);