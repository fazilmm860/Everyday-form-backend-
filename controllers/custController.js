
const multer = require('multer');

const custSchema = require('../models/customer')





const postCustomer = async (req, res) => {

    try {
        // //Handle image upload using multer
        // const upload = multer({ storage: multer.memoryStorage() }).fields([
        //     { name: 'aadharFront', maxCount: 1 },
        //     { name: 'aadharBack', maxCount: 1 },
        //     { name: 'panCard', maxCount: 1 },
        // ]);
        // upload(req, res, async (uploadError) => {
        //     console.log(req.body); // Check if form fields are parsed correctly
        //     console.log(req.files);
        //     if (uploadError) {
        //         return res.status(500).json({ error: `Error uploading image:${uploadError}` });
        //     }
        // })

        // //Associate uploaded images with customer details
        // const aadharFrontImage = req.files['aadharFront'][0];
        // const aadharBackImage = req.files['aadharBack'][0];
        // const panCardImage = req.files['panCard'][0];

        const custdetails = new custSchema({
            date: req.body.date,
            exeName: req.body.exeName,
            dseCode: req.body.dseCode,
            cardSelect: req.body.cardSelect,
            surrogate: req.body.surrogate,
            custName: {
                firstName: req.body.custName.firstName,
                middleName: req.body.custName.middleName,
                lastName: req.body.custName.lastName
            },
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            maritalStatus: req.body.maritalStatus,
            spouseName: req.body.spouseName,
            qualification: req.body.qualification,
            other: req.body.other,
            panNumber: req.body.panNumber,
            mobileNumber: req.body.mobileNumber,
            altMobileNumber: req.body.altMobileNumber,
            email: req.body.email,
            residenceAddress: {
                flat: req.body.residenceAddress.flat,
                street: req.body.residenceAddress.street,
                city: req.body.residenceAddress.city,
                state: req.body.residenceAddress.state,
                landMark: req.body.residenceAddress.landMark,
                pincode: req.body.residenceAddress.pincode
            },
            sameAsAbove: req.body.sameAsAbove,
            permanentAddress: {
                flat: req.body.permanentAddress.flat,
                street: req.body.permanentAddress.street,
                city: req.body.permanentAddress.city,
                state: req.body.permanentAddress.state,
                landMark: req.body.permanentAddress.landMark,
                pincode: req.body.permanentAddress.pincode
            },
            periodResidence: req.body.periodResidence,
            residenceIs: req.body.residenceIs,
            companyName: req.body.companyName,
            companyAddress: {
                flat: req.body.companyAddress.flat,
                street: req.body.companyAddress.street,
                city: req.body.companyAddress.city,
                state: req.body.companyAddress.state,
                landMark: req.body.companyAddress.landMark,
                pincode: req.body.companyAddress.pincode
            },
            designation: req.body.designation,
            telNo: req.body.telNo,
            officeEmail: req.body.officeEmail,
            employmentType: req.body.employmentType,
            employmentDetails: req.body.employmentDetails,
            // aadharFrontImage: {
            //     data: aadharFrontImage.buffer,
            //     contentType: aadharFrontImage.mimetype,
            // },
            // aadharBackImage: {
            //     data: aadharBackImage.buffer,
            //     contentType: aadharBackImage.mimetype,
            // },
            // panCardImage: {
            //     data: panCardImage.buffer,
            //     contentType: panCardImage.mimetype,
            // },
            hdfcAcc: req.body.hdfcAcc,
            otherAcc: req.body.otherAcc,

            remark: req.body.remark


        });



        await custdetails.save();
        res.status(201).json({ message: `Customer details are saved:-> ${custdetails}` });
    } catch (error) {
        res.status(500).json({ error: `An error occurred while submitting data:-> ${error}` });

    }
};





const getCustomer = async (req, res) => {
    try {
        const customerdata = await custSchema.find();
        res.status(200).json({ message: customerdata })

    } catch (error) {
        res.status(500).json({ error: `An error occured while getting data: -> ${error} ` })

    }
}

const editCustumor = async (req, res) => {
    try {
        const customerId = req.params._id;

        const result = await custSchema.findByIdAndUpdate(customerId, req.body, { new: true });
        if (result) {
            res.status(200).json({ messsage: `Customer details updated successfully`, data: result })
        } else {
            res.status(404).json({ message: `Customer not found` })
        }
    } catch (error) {
        res.status(500).json({ error: `An error Occured while updating the data : -> ${error}` })
    }

}

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params._id;
        const result = await custSchema.findByIdAndDelete(customerId);
        if (result) {
            res.status(200).json({ message: `Customer deleted successfully` })
        } else {
            res.status(404).json({ message: `Customer not found` })
        }
    } catch (error) {
        res.status(500).json({ error: `An error occured while deleting Customer data:-> ${error}` })
    }
}

module.exports = { postCustomer, getCustomer, editCustumor, deleteCustomer }