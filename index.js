const express = require("express");
const mysql = require("mysql");
// const { conn } = require("./helpers/databaseConnection");
const userRoutes = require("./routes/user-routes");
const emailRoutes = require("./routes/email-routes");
const Email = require("email-templates");
const mailer = require("nodemailer");
const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path")
const { emailTransport, getMailConfig } = require("./helpers/mailConfig");
const { conn } = require("./helpers/databaseConnection");

const app = express();
const port = 5000;
dotEnv.config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorozation')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/emails", emailRoutes);

app.use((req, res, next) => {
    throw new Error("Could not find this route");
});

app.get('/', (req, res) => res.send('Hello Amey!'));

// const conn2 = mysql.createConnection({
//     host: "email-server-mysql.mysql.database.azure.com",
//     port: 1433,
//     user: "ameykhoje@email-server-mysql",
//     password: "Amey@12345",
//     database: "email_portal",
//     ssl: true,
//     // debug: true
// })



// conn2.on('error', () => {
//     console.log("ERROR");
// })

// conn2.query('SELECT 1', (error, result, fields) => {
//     console.log(error);
//     console.log(result);
//     console.log(fields);
// })

// conn2.getConnection((err, connection) => {
//     console.log(err)
//     console.log(connection)
// })

conn.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected to azure")
        app.listen(port, () => {
            console.log(`Connected to database`);
        });
    }
})

// conn.connect((err) => {
//     if(err) throw err;
//     app.listen(port, () => {
//         console.log(`Connected to database`);
//     });
// });
