const multer = require('multer');
const path = require('path');
const ImageSchema = require('../models/ImageUpload');


const url = 'mongodb://localhost:27017/eeryday';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});



const upload = multer({ storage: storage })

const uploadImage = async (req, res) => {

    try {
        const files = req.files;

        // Create a new document in MongoDB for each uploaded file
        for (const fieldName in files) {
            const file = files[fieldName][0];
            const image = new ImageSchema({
                filename: file.fieldName,
                filepath: file.path,
                field: fieldName,
            });
            await image.save();
        }

        res.status(201).send('Images uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getImage = async (req, res) => {
    try {
        const images = await ImageSchema.find();
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

};

module.exports = { uploadImage, getImage }