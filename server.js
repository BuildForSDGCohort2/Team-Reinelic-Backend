const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const fileUpload = require('express-fileupload')

const connectDB = require('./config/db');

const app = express();
const path = require('path');




//DATABASE

connectDB();

//MIDDLEWARES 
// app.use(fileUpload(
// {
//     debug:true
// }))
app.use(morgan('tiny'));
app.use(express.json({
    extended: false
}));





//ROUTES



app.use('/api/user', require('./api/users'));
app.use('/api/activity', require('./api/activities'));
app.use('/api/place', require('./api/places'));
app.use('/api/profile', require('./api/profiles'));
app.use('/api/report', require('./api/reports'));
app.use('/api/auth', require('./api/auth'));

// SERVE STATIC ASSET

if(process.env.NODE_ENV === "production"){

    app.use(express.static('client/build'));

    app.getMaxListeners('*',(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('App is listening'));