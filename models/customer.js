const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    exeName: {
        type: String,
        required: true
    },
    dseCode: {
        type: String,
        required: true
    },
    cardSelect: {
        type: String,
        required: true
    },
    surrogate: {
        type: String,
        required: true
    },



})

const custSchema = mongoose.model('custSchema', customerSchema)

module.exports = custSchema;