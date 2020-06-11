const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const File = require('../models/File');
// const parser = require('../middleware/cloudinaryConfig');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
    allowedFormats: ['jpg', 'jpeg', 'png', 'svg', 'mp4'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const parser = multer({ storage: storage });

// @desc    Get all Files
// @route   GET /api/v1/files
// @access  Public
exports.getFiles = asyncHandler(async (req, res, next) => {
  const files = await File.find();

  res.status(200).json({
    success: true,
    count: files.length,
    data: files,
  });
});

// @desc    Get single File
// @route   GET /api/v1/files/:id
// @access  Public
exports.getFile = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(
      next(new ErrorResponse(`File not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: file,
  });
});

// @desc    Create new File: Single
// @route   POST /api/v1/files
// @access  Private
exports.createFile = asyncHandler(async (req, res, next) => {
  parser.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(
        next(new ErrorResponse(`A Multer error occurred when uploading.`, 404))
      );
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(
        next(
          new ErrorResponse(`An unknown error occurred when uploading.`, 404)
        )
      );
    }
    // Add file path to request body
    if (req.file.path) req.body['path'] = req.file.path;
    // console.log(req.body);
    let file = new File(req.body);
    file.save();

    res.status(201).json({
      success: true,
      data: file,
    });
  });
});

// @desc    Create new Files: Multiple
// @route   POST /api/v1/files/bulk
// @access  Private
exports.createBulkFile = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Update File
// @route   PUT /api/v1/files/:id
// @access  Private
exports.updateFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!file) {
    return next(
      next(new ErrorResponse(`File not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: file,
  });
});

// @desc    Delete File
// @route   DELETE /api/v1/files/:id
// @access  Private
exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  if (!file) {
    return next(
      next(new ErrorResponse(`File not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
