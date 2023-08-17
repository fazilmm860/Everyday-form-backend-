const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({

    date: {
        type: String,

    },
    exeName: {
        type: String,

    },
    dseCode: {
        type: String,

    },
    cardSelect: {
        type: String,

    },
    surrogate: {
        type: String,

    },
    custName: {

        firstName: {
            type: String,

        },
        middleName: {
            type: String,

        },
        lastName: {
            type: String,

        },
    },

    dateOfBirth: {

        type: String,

    },
    gender: {
        type: String,

    },
    maritalStatus: {
        type: String,

    },
    spouseName: {
        type: String,

    },
    qualification: {
        type: String,

    },
    other: {
        type: String
    },
    panNumber: {
        type: String,

    },
    mobileNumber: {
        type: String,

    },
    altMobileNumber: {
        type: String,

    },
    email: {
        type: String,

    },
    residenceAddress: {
        flat: {
            type: String,

        },
        street: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },
        landMark: {
            type: String,

        },
        pincode: {
            type: String,

        },
    },
    sameAsAbove: {
        type: Boolean
    },
    permanentAddress: {
        flat: {
            type: String,

        },
        street: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },
        landMark: {
            type: String,

        },
        pincode: {
            type: String,

        },


    },
    periodResidence: {
        type: String,

    },

    residenceIs: {
        type: String,

    },
    companyName: {
        type: String,

    },
    companyAddress: {
        flat: {
            type: String,

        },
        street: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },
        landMark: {
            type: String,

        },
        pincode: {
            type: String,

        }

    },
    designation: {
        type: String,

    },
    telNo: {
        type: String,

    },
    officeEmail: {
        type: String,

    },
    employmentType: {
        type: String,
    },
    employmentDetails: {
        type: String
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