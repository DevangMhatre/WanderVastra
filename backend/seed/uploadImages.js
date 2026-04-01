const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async () => {
  try {
    const imagesFolder = path.join(__dirname, "../assets");

    const files = fs.readdirSync(imagesFolder);

    for (const file of files) {
      const filePath = path.join(imagesFolder, file);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "products",
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      console.log("Uploaded:", result.secure_url);
    }

    console.log("All images uploaded successfully 🚀");
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

uploadImages();
