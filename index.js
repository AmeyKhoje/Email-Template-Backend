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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next();
})

// ? Parsing request through middleware
app.use(express.json());

// ? Route middleware
app.use("/api/users", userRoutes);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res, next) => {
    const sess = req.session;
    res.json({ session: sess })
});

// ? Route not found middleware
app.use((req, res, next) => {
    throw new Error("Could not find this route");
});

// ? Connecting to Database
conn.connect((error, connection) => {
    if(error) {
        console.log("Error");
        return;
    }
    console.log("Database Connection Successful");
    app.listen(port, () => {
        console.log("Server Started.");
    })
});