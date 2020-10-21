require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require('morgan');
const database = require("./database");

const indexRouter = require('./routes/index');
const recordsRouter = require('./routes/records');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/records', recordsRouter);

module.exports = app;
