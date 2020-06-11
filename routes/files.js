const express = require('express');
const {
  getFiles,
  getFile,
  createFile,
  createBulkFile,
  updateFile,
  deleteFile,
} = require('../controllers/files');

const router = express.Router();

router
  .route('/')
  .get(getFiles)
  .post(createFile);

router
  .route('/bulk')
  .post(createBulkFile);

router
  .route('/:id')
  .get(getFile)
  .put(updateFile)
  .delete(deleteFile);

module.exports = router;
