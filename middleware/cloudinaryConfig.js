const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpg', 'jpeg', 'png', 'mp4', 'svg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
