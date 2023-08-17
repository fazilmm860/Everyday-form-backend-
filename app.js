const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose')
const submit = require('./routers/user')
const custdata = require('./routers/customerRoute')

const app = express();
const DB = async () => {
    try {
        const con = await mongoose.connect(`mongodb://localhost:27017/eeryday`)
        console.log(`MongoDB Connected:->${con.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

DB();
app.use(express.json())

app.use(cors())


const port = 5000
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api', submit)
app.use('/api', custdata)

app.listen(port, () => {
    console.log(`Server connected:->${port}`);
})