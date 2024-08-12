const express = require('express');
const multer = require('multer');
const path = require('path');
const { recognizeRoadSign } = require('../utils/recognizeRoadSign');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Define the route for recognizing road signs
router.post('/recognize-road-sign', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const sign = await recognizeRoadSign(filePath); // Process the image and get the sign
        res.json({ sign });
    } catch (error) {
        console.error('Error recognizing the road sign:', error);
        res.status(500).json({ error: 'Error recognizing the road sign' });
    }
});

module.exports = router;
