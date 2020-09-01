const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");

const connectDB = require('./config/db');

const app = express();




//DATABASE

connectDB();

//MIDDLEWARES 

app.use(morgan('tiny'));
app.use(express.json({extended:false}));




//ROUTES



app.use('/api/user', require('./api/users'));
app.use('/api/activity', require('./api/activities'));
app.use('/api/place', require('./api/places'));
app.use('/api/profile', require('./api/profiles'));
app.use('/api/report', require('./api/reports'));
app.use('/api/auth', require('./api/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => debug(`App is listening to  ${chalk.red(PORT)}`));