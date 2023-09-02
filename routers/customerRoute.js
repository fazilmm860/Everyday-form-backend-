const express = require('express');
const { postCustomer, getCustomer, editCustumor, deleteCustomer, getCustomerDetails } = require('../controllers/custController');

const router = express.Router();

router.post('/sendData', postCustomer);
router.get('/getdata', getCustomer);
router.put('/edit/:_id', editCustumor);
router.delete('/delete/:_id', deleteCustomer);
router.get('/getDetails/:_id', getCustomerDetails);



module.exports = router     