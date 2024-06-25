import express from 'express'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
// import {UserRouter} from './routes/user.js';
import {DonationRouter} from './routes/donation.js';
import { DonatorRouter } from './routes/donator.js';

const app = express();
app.use(express.json()); 
app.use(cors({ 
    origin: ["http://localhost:3000"],
    credentials: true
})); 
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{ 
    // listen for requests
    app.listen(process.env.PORT, ()=>{
        console.log('Listening to port', process.env.PORT); 
    })
}) 
.catch((error)=>{ 
    console.log(error); 
})

app.use('/auth', DonatorRouter);
app.use('/', DonationRouter);

 

