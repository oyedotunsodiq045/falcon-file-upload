const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const File = require('../models/File');
const parser = require('../middleware/cloudinaryConfig');
const multer = require('multer');

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
      new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
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
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
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
  parser.array('files', 12)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    }
    // Add files path to request body
    let path;
    req.files.forEach((file) => {
      // console.log(file.path);
      if (file.path) req.body['path'] = file.path;
      // console.log(req.body);
      path = new File(req.body);
      path.save();
    });

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
    });
  });
});

// @desc    Update File
// @route   PUT /api/v1/files/:id
// @access  Private
exports.updateFile = asyncHandler(async (req, res, next) => {
  parser.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    }
    // Add file path to request body
    if (req.file.path) req.body['path'] = req.file.path;
    const file = File.findByIdAndUpdate(req.params.id, {
      path: req.body['path'],
    });

    if (!file) {
      return next(
        new ErrorResponse(`An unknown error occurred when uploading.`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: file,
    });
  });
});

// @desc    Delete File
// @route   DELETE /api/v1/files/:id
// @access  Private
// To delete images, we have to first delete from cloudinary server, wait for a response,
// and if successful remove from our database. The API for removing from the cloud using the SDK is "destroy"
exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  console.log(file);

  // if (!file) {
  //   return next(
  //     new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
  //   );
  // }

  // res.status(200).json({
  //   success: true,
  //   data: {},
  // });
});
