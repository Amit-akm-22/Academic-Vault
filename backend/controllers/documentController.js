const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

// @desc    Upload a document
// @route   POST /api/documents
// @access  Private
const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const { title, category } = req.body;

        const doc = await Document.create({
            user: req.user._id,
            title,
            category,
            fileUrl: `/api/documents/${req.file.originalname}`, // This will be handled by the route
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            fileData: req.file.buffer,
            fileContentType: req.file.mimetype
        });

        res.status(201).json({
            _id: doc._id,
            user: doc.user,
            title: doc.title,
            category: doc.category,
            fileName: doc.fileName,
            mimeType: doc.mimeType,
            size: doc.size,
            createdAt: doc.createdAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a document's actual file
// @route   GET /api/documents/:id/view
// @access  Private
const getFile = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check for user
        if (doc.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.set('Content-Type', doc.fileContentType);
        res.send(doc.fileData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all documents for a user
// @route   GET /api/documents
// @access  Private
const getDocuments = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const documents = await Document.find({
            user: req.user._id,
            ...keyword,
            ...category
        }).sort({ createdAt: -1 });

        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check for user
        if (doc.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', doc.fileUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await doc.deleteOne();

        res.json({ message: 'Document removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument,
    getFile
};
