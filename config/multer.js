import multer from "multer";
import cloudinary from "./Cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const Storage=new CloudinaryStorage({
    cloudinary:cloudinary.v2,
   params: async (req, file) => {
        // Logic to determine folder
        let folderName = "GENERAL_UPLOADS";
        
        if (file.fieldname === "Cover") {
            folderName = "COVERS";
        } else if (file.fieldname === "Logo") {
            folderName = "LOGOS";
        }
        return {
            folder: folderName,
            allowed_formats: ["jpg", "jpeg", "png"],
           public_id: `${Date.now()}-${file.originalname.split(".")[0]}`
 // Optional: keep original filename
        }}
})

const Upload = multer({storage:Storage});
export default Upload;
