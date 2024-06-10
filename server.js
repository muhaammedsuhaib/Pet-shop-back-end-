import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import authenticationRoute from './routes/authenticationRoute.js';
import adminRoute from "./routes/adminRoute.js";
import productRoute from './routes/productRoute.js';
import cors from 'cors';

// Config .env
config();


const PORT= process.env.PORT || 3000;
const DB = process.env.DB;
const app=express();
app.use(express.json());

mongoose.connect(DB)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err));

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true 
}))

app.use('/api/users',authenticationRoute);

app.use('/api/admin',adminRoute);
app.use('/api/users/products',productRoute);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})