// import express from 'express';

const express = require('express');

// Creating express object
const app = express();

// Port Number
const PORT = process.env.PORT ||5000;

// // Handling GET request
// app.get('/', (req, res) => { 
//     res.send('A simple Node App is '
//         + 'running on this server') 
//     res.end() 
// }) 


// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));