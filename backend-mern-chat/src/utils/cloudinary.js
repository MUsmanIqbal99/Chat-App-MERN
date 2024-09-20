import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log("LocalFilePath: ", localFilePath);
  if (!localFilePath) return null;

  let response = null;
  try {
    response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on Cloudinary successfully", response.url);
  } catch (error) {
    console.log("Cloudinary upload error", error);
  } finally {
    // Remove the local file
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file", unlinkError);
    }
  }
  
  return response;
};

export { uploadOnCloudinary };
