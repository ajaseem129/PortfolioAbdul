var express = require('express')
var app = express();
require("dotenv").config();
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.SERVER_IP,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
module.exports = connection;
