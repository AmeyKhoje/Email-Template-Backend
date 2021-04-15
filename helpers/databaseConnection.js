const mysql = require("mysql");
const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");

// ? Configure DotEnv
dotEnv.config();

/*
    ? CreatePool method on mysql package
    ? Connecting to database for multiple requests
*/
const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    ssl: { ca: fs.readFileSync(path.resolve("./BaltimoreCyberTrustRoot.crt.pem"))}
});

exports.conn = conn;