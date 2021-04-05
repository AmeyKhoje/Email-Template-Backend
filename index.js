const express = require("express");
const mysql = require("mysql");
const { conn } = require("./helpers/databaseConnection");
const userRoutes = require("./routes/user-routes");

const app = express();
const port = 3000;

app.use(express.json())

app.use("/api/users", userRoutes);
// app.use("/api/emails");

app.use((req, res, next) => {
    throw new Error("Could not find this route");
});

app.get('/', (req, res) => res.send('Hello Amey!'));

// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "email_template"
// });

conn.connect((err) => {
    if(err) throw err;
    app.listen(port, () => {
        console.log(`Connected to database`);
        // conn.query("select * from users", (err, data) => {
        //     console.log(data);
        // })
    });
});
