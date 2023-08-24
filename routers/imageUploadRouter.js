const express = require('express');
const router = express.Router();
const { uploadImage, getImage } = require('../controllers/ImageUploadController');

const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage });

router.post('/upload', upload.fields([
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'passportSizePhoto', maxCount: 1 },
    { name: 'signature', maxCount: 1 }

]), uploadImage);

router.get('/getImage', getImage);

module.exports = router;
