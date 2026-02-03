import express from 'express'
import { addHospital, deleteHospital, getHospitals, UpdateHospital } from '../controler/HospitalCOntroller.js';
export const hospitalsRoutes=express.Router();
hospitalsRoutes.get('/hospitals',getHospitals);
hospitalsRoutes.get('/hospital/:id',getHospitals);
hospitalsRoutes.delete('/hospital/:id',deleteHospital);
hospitalsRoutes.post('/hospital',addHospital);
hospitalsRoutes.put('/hospital/:id',UpdateHospital);
