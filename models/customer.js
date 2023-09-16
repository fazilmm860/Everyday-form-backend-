const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({

    date: {
        type: String,

    },
    applicationNumber:{
        type:String,
        unique:true,
        required:true,
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
    custName: {

        firstName: {
            type: String,
            required: true

        },
        middleName: {
            type: String,

        },
        lastName: {
            type: String,
            required: true

        },
    },

    dateOfBirth: {

        type: String,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    maritalStatus: {
        type: String,
        required: true

    },
    spouseName: {
        type: String,

    },
    qualification: {
        type: String,
        required: true

    },
    other: {
        type: String
    },
    panNumber: {
        type: String,
        required: true

    },
    mobileNumber: {
        type: String,

    },
    altMobileNumber: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    residenceAddress: {
        flat: {
            type: String,
            required: true

        },
        street: {
            type: String,
            required: true

        },
        city: {
            type: String,
            required: true

        },
        state: {
            type: String,
            required: true

        },
        landMark: {
            type: String,
            required: true

        },
        pincode: {
            type: String,
            required: true

        },
    },
    sameAsAbove: {
        type: Boolean
    },
    permanentAddress: {
        flat: {
            type: String,
            required: true

        },
        street: {
            type: String,
            required: true

        },
        city: {
            type: String,
            required: true

        },
        state: {
            type: String,
            required: true

        },
        landMark: {
            type: String,
            required: true

        },
        pincode: {
            type: String,
            required: true

        },


    },
    periodResidence: {
        type: String,
        required: true

    },

    residenceIs: {
        type: String,
        required: true

    },
    companyName: {
        type: String,
        required: true

    },
    companyAddress: {
        flat: {
            type: String,
            required: true

        },
        street: {
            type: String,
            required: true

        },
        city: {
            type: String,
            required: true

        },
        state: {
            type: String,
            required: true

        },
        landMark: {
            type: String,
            required: true

        },
        pincode: {
            type: String,
            required: true

        }

    },
    designation: {
        type: String,
        required: true

    },
    telNo: {
        type: String,
        required: true

    },
    officeEmail: {
        type: String,
        required: true

    },
    employmentType: {
        type: String,
        required: true
    },
    employmentDetails: {
        type: String,
        required: true
    },

    hdfcAcc: {
        type: String
    },
    otherAcc: {
        type: String
    },
    remark: {
        type: String
    }

})

const custSchema = mongoose.model('custSchema', customerSchema)

module.exports = custSchema;