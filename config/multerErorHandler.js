import multer from "multer";

export const multerErrorHandler = (err, req, res, next) => {
  // Multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message, // "Unexpected field"
      code: err.code        // e.g. LIMIT_UNEXPECTED_FILE
    });
  }

  // Other unknown errors
  if (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server error"
    });
  }

  next();
};


