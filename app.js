const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const mongoose = require('mongoose')

const custdata = require('./routers/customerRoute')
const imageUpload = require('./routers/imageUploadRouter');
const userRoutes = require('./routers/user');
const authRoutes = require('./routers/auth');

const app = express();
dotenv.config()
const DB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/eeryday', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('Connected to MongoDB');
        });



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


app.use('/api', custdata)
app.use('/images', imageUpload);
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log(`Server connected:->${port}`);
})