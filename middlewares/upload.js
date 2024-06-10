import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Multer storage (temporary storage)
const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: { fileSize: 2000000000 }, // 2GB file size limit
});

// Middleware to handle image upload and Cloudinary upload
const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, async (error) => {
    if (error) {
      return next(error);
    }
      console.log(req.file);
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        req.cloudinaryImageUrl = result.secure_url;
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
};

export default uploadImage;
