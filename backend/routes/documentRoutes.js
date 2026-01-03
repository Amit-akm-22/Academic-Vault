const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments, deleteDocument } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .post(protect, upload.single('file'), uploadDocument)
    .get(protect, getDocuments);

router.route('/:id')
    .delete(protect, deleteDocument);

module.exports = router;
