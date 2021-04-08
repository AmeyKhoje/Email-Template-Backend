const express = require("express");
const mysql = require("mysql");
const { conn } = require("./helpers/databaseConnection");
const userRoutes = require("./routes/user-routes");
const Email = require("email-templates");
const mailer = require("nodemailer");
const dotEnv = require("dotenv");
const { emailTransport, getMailConfig } = require("./helpers/mailConfig");

const app = express();
const port = 3000;
dotEnv.config();

app.use(express.json())

app.use("/api/users", userRoutes);
// app.use("/api/emails");

app.use((req, res, next) => {
    throw new Error("Could not find this route");
});

app.get('/', (req, res) => res.send('Hello Amey!'));

conn.connect((err) => {
    if(err) throw err;
    app.listen(port, () => {
        console.log(`Connected to database`);
    });
});
