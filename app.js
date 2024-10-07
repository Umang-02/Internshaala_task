import express from 'express';
import connectDB from './db/connectDB.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// const express = require('express');

dotenv.config();

connectDB();

// // Creating express object
const app = express();

// Port Number
const PORT = process.env.PORT ||5000;

// // Handling GET request
// app.get('/', (req, res) => { 
//     res.send('A simple Node App is '
//         + 'running on this server') 
//     res.end() 
// }) 

//to parse the JSON data in the req.body, we use the below code
app.use(express.json({limit:"50mb"}));

//to parse the form data, we use the following
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));