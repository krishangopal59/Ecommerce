const express = require('express');
const cors = require('cors');
const { mongoose } = require('./backend/db.js');
var productController = require('./backend/controllers/productController');
var userController = require('./backend/controllers/userController');
const fs = require('fs')
fs.existsSync("uploads") || fs.mkdirSync("uploads");
fs.existsSync("profile") || fs.mkdirSync("profile");
var app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.API_PORT,()=>{console.log("new connected to port :"+process.env.API_PORT)});
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('profile'));
app.use('/product',productController);
app.use('/user',userController)