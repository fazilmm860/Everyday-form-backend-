const express = require('express');
const { postCustomer, getCustomer } = require('../controllers/custController')

const router = express.Router()

router.post('/sendData', postCustomer);
router.get('/getdata', getCustomer);

module.exports = router