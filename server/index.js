import express from 'express';
import mongoose from 'mongoose';



import privateRoutes from './routes/private.js';
import errorHandler from './middleware/error.js';

import cors from 'cors';
import studentRoutes from './routes/student.js';
import authRoutes from './routes/auth.js';

import dotenv from 'dotenv'

const app = express();
dotenv.config({path: "./config.env"});
app.use(express.json({limit: "20mb", extended: true}));
app.use(express.urlencoded({limit: "20mb", extended: true}));
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);

//Error Handler (end of middleware)
app.use(errorHandler);

app.use('/students', studentRoutes);

const CONNECTION_URL = 'mongodb+srv://guests:1234@cluster0.dptiqxy.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000 ;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));

