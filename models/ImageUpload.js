const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    aadharFront: {

        type: String,
    },
    aadharBack: {

        type: String,
    },
    panCard: {

        type: String,
    },
    passportSizePhoto: {
        type: String,

    },
    signature: {
        type: String,

    }
});
const ImageSchema = mongoose.model('ImageSchema', imageSchema);

module.exports = ImageSchema;