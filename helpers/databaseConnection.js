const mysql = require("mysql");
const dotEnv = require("dotenv");

dotEnv.config();

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.conn = conn;
