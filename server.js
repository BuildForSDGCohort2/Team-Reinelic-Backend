const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");

const app = express();

//MIDDLEWARE 

app.use(morgan('tiny'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => debug(`App is listening to  ${chalk.red(PORT)}`));

app.get("/", (req, res) => res.send(" Hello Parents"));
