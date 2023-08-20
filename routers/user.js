// routes/index.js

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/user');

router.post('/submitfeedback', feedbackController.submitFeedback);

module.exports = router;
