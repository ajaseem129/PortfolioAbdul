var express = require('express')
var app = express()

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '159.65.159.79',
    user: 'appdotlab',
    password: 'androidstudio3',
    database: 'AbdulPortfolio'
});
module.exports = connection;
