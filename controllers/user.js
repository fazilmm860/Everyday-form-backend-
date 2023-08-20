// controllers/feedbackController.js

const Feedback = require('../models/user');

exports.submitFeedback = async (req, res) => {
    try {
        const { name, email, option, comments, conditionMet, conditionalField } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            option,
            comments,
            conditionMet,
            conditionalField
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while submitting feedback' });

    }
};
