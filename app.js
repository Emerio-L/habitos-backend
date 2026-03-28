const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 



require("dotenv").config();
const connectDB = require("./config/db");
connectDB();


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importar CORS
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var habitosRouter = require('./routes/habitos');
var app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  origin: [
    "https://habitos-frontend-388g.onrender.com", 
    "http://localhost:3001"
  ],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/habitos', habitosRouter);

module.exports = app;
