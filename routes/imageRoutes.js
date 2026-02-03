import express from 'express';
import { SingleImageController,MultipleImageController } from '../controler/imageController.js';
import Upload from '../config/multer.js';
import { multerErrorHandler } from '../config/multerErorHandler.js';
export const imageRouter=express.Router();
imageRouter.post("/upload",Upload.single("image"),SingleImageController,multerErrorHandler)
imageRouter.post("/uploadBoth",Upload.fields([
    { name: "Logo", maxCount: 1 },
    { name: "Cover", maxCount: 1 },
  ]),MultipleImageController,multerErrorHandler)
