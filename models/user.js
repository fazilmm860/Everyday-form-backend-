// models/feedback.js

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    option: String,
    comments: String,
    conditionMet: Boolean, // This field indicates whether the condition is met
    conditionalField: String // This field will be present based on the condition
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
