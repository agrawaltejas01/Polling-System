const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) console.error(`Error in connecting to db : ${err}`);
  else console.log('Successfully connected to database');
});

module.exports.db = db;
