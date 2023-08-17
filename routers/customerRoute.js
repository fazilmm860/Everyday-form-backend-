const express = require('express');
const { postCustomer, getCustomer, editCustumor } = require('../controllers/custController')

const router = express.Router()

router.post('/sendData', postCustomer);
router.get('/getdata', getCustomer);
router.put('/edit/:_id', editCustumor)
module.exports = router