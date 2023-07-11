
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const customLogger = require('./middleware/customLogger');
const morgan = require('morgan');
const colors = require('colors');

const PORT = 5000;

// models: 
require('./models/user.models');
require('./models/post.models');

// routes:
const userRoutes = require('./routes/user.route');
const postRouter = require('./routes/post.routes');

// database connection: 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
})
mongoose.connection.on('error', (err) => {
    console.log('Mongoose is not connected!!!!', err);
})


morgan.token('info', function (req, res) { return req.headers['authorization'] })
morgan.format('abhi', ':method :url :status :info'.underline.red);

// middlewares: 

app.use(express.json());
app.use(cors());
app.use(customLogger);
app.use(morgan('abhi'));
app.use('/api/user', userRoutes);
app.use('/api/post', postRouter);

// app.use(errorHandler);




// routes:

app.get("/hello", (req, res) => {
    res.send("Hello World");
})







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
