const express = require("express");
const userRoutes = require("./routes/user-routes");
const emailRoutes = require("./routes/email-routes");
const dotEnv = require("dotenv");
const { conn } = require("./helpers/databaseConnection");

// ? Init express app
const app = express();
const port = 5000;

// ? Configure DotEnv
dotEnv.config();

// ? Setting cors middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorozation')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

// ? Parsing request through middleware
app.use(express.json())

// ? Route middleware
app.use("/api/users", userRoutes);
app.use("/api/emails", emailRoutes);

// ? Route not found middleware
app.use((req, res, next) => {
    throw new Error("Could not find this route");
});

// ? Connecting to Database
conn.getConnection((error, connection) => {
    if(error) {
        console.log(error);
        connection.release();
    }
    console.log("Connection Successful");
    app.listen(port, () => {
        console.log("Server Started.");
    })
    connection.on("error", (err) => {
        console.log("ERROR WHILE CONNECTION");
    })
});