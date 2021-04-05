const { conn } = require("../helpers/databaseConnection");

const login = async (req, res, next) => {
    console.log(req.body);
    let existingUser
    const {
        email,
        mobile,
        password
    } = req.body;

    

    try {
        conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
            console.log(result[0].email);
            res.json({ message: "Logged In", loginSuccess: true, data: result[0] })
        });
    }
    catch(err) {
        console.log(err);
        return;
    }

    
};

const createUser = async (req, res, next) => {};

const getUserById = async (req, res, next) => {};

const deleteUser = async (req, res, next) => {};

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;