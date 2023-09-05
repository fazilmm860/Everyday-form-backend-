require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const cookiParser = require("cookie-parser")
const mongoose = require('mongoose')

const custdata = require('./routers/customerRoute')
const imageUpload = require('./routers/imageUploadRouter');
const userRoutes = require('./routers/user');
const authRoutes = require('./routers/auth');

const loginRouter = require('./routers/user')

const app = express();

const DB = async () => {
    try {
        mongoose.connect(process.env.DB_URL, {
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

app.use(cookiParser());
app.use(cors({
    origin: 'https://everyday-finance-solution-crm-frontend-h0iz.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and other credentials
}));


const port = process.env.PORT
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


app.use('/api', custdata)
app.use('/images', imageUpload);
app.use('/api', loginRouter);

app.listen(port, () => {
    console.log(`Server connected:->${port}`);
})