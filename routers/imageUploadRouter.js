const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/ImageUploadController');

const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage: storage });

router.post('/upload', upload.fields([
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'passportSizePhoto', maxCount: 1 },
    { name: 'signature', maxCount: 1 }

]), uploadImage);


module.exports = router;
