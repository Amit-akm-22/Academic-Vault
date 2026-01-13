const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Certificate', 'Result', 'Admit Card', 'Resume', 'ID', 'Other']
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    mimeType: {
        type: String
    },
    size: {
        type: Number
    },
    fileData: {
        type: Buffer,
        required: true
    },
    fileContentType: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
