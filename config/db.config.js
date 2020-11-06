'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sysmodb'
});
dbConn.connect(function (err) {
  if (err) {
    console.log('Cannot connect to data base');
  } else {
    console.log("Database Connected!");
  }
});
module.exports = dbConn;