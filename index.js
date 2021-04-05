const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "email_template"
});

// conn.connect((err) => {
//     if(err) throw err;
    app.listen(port, () => console.log(`Connected to database`));
// });
