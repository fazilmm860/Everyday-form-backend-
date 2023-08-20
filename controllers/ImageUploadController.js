const multer = require('multer');
const path = require('path');
const imageSchema = require('../models/ImageUpload');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
})


const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
    const { aadharFront, aadharBack, panCard, passportSizePhoto } = req.files;

    const ImageSchema = new imageSchema({
        aadharFront: aadharFront[0].path,
        aadharBack: aadharBack[0].path,
        panCard: panCard[0].path,
        passportSizePhoto: passportSizePhoto[0].path,
    })
    ImageSchema.save()
        .then(() => {
            res.status(201).json({ message: `Image uploaded successfully `, image: ImageSchema })

        })
        .catch(error => {
            res.status(500).json({ error: 'Image upload failed', error });
        })
};

module.exports = { uploadImage }