import express from 'express'
export const SingleImageController = (req, res) => {
  try {
    // Check if files exist
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ error: "Please upload at least one image" });
    }

    // CloudinaryStorage automatically uploads the file
    // req.files.image[0].path is the Cloudinary URL
    const imageUrl = req.files.image[0].path;

    res.json({
      message: "Image uploaded successfully",
      imageUrl, // ✅ Cloudinary URL
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const MultipleImageController = (req, res) => {
    try {

         if (!req.files || !req.files.Logo || !req.files.Cover) {
    return res.status(400).json({ error: "Please upload both images" });
  }

const logoUrl = req.files?.Logo?.[0]?.path;
const coverUrl = req.files?.Cover?.[0]?.path;


  res.json({
    message: "Images uploaded successfully",
    Logo:logoUrl,
    Cover:coverUrl
  });
        
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error !" });
    }
 
};

