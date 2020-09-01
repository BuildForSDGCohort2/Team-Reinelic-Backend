const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");

const connectDB = require('./config/db');

const app = express();




//DATABASE

connectDB();

//MIDDLEWARE 

app.use(morgan('tiny'));




//ROUTES

app.get("/", (req, res) => res.send(" Hello Parents"));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => debug(`App is listening to  ${chalk.red(PORT)}`));

