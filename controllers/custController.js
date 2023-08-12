const custSchema = require('../models/customer')

const postCustomer = async (req, res) => {
    const custdetails = new custSchema({
        date: req.body.date,
        exeName: req.body.exeName,
        dseCode: req.body.dseCode,
        cardSelect: req.body.cardSelect,
        surrogate: req.body.surrogate
    })
    try {
        await custdetails.save()
        res.status(201).json({ message: `customer details are saved:->${custdetails}` })
    } catch (error) {
        res.status(500).json({ error: `An error occured while submitting data:-> ${error}` })
    }
}

const getCustomer = async (req, res) => {
    try {
        const customerdata = await custSchema.find();
        res.status(200).json({ message: customerdata })
    } catch (error) {
        res.status(500).json({ error: `An error occured while getting data: -> ${error} ` })

    }
}

module.exports = { postCustomer, getCustomer }