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
app.use(cors({origin: ("https://client-web-wlgu.onrender.com" || 'http://localhost:3000')}));
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'react-app', 'build', 'index.html'));
  });
  

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

