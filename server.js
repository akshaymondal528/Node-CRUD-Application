const express = require('express');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/users', userRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`Server run on http://localhost:${port}`));
