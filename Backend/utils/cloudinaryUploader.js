import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
    });

    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    return result.secure_url;
  } catch (error) {
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting file after failed upload:", err);
    });
    throw error;
  }
};

export default uploadToCloudinary;
