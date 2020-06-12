const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'major-stark',
  api_key: '918359138166357',
  api_secret: 'MkH4n0bmcjWtksHIAW5giRB4o44',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpg', 'jpeg', 'png', 'mp4', 'svg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

module.exports = multer({ storage: storage });
