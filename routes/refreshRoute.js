import express from 'express';
import { refreshAccessToken } from '../middlewire/refreshToken.js';
export const refreshRouter=express.Router();
refreshRouter.post("/refresh",refreshAccessToken)