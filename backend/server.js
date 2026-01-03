require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));

app.get('/', (req, res) => {
    res.send('EduVault API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eduvault')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
