const mysql = require("mysql");
const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotEnv.config();

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    ssl: { ca: fs.readFileSync(path.resolve("./BaltimoreCyberTrustRoot.crt.pem"))}
});

exports.conn = conn;
// exports.conn2 = conn2;
