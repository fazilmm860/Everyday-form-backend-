const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const custdata = require('./routers/customerRoute')
const imageUpload = require('./routers/imageUploadRouter');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const port = 5000
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


app.use('/api', custdata)
app.use('/images', imageUpload);


app.listen(port, () => {
    console.log(`Server connected:->${port}`);
})