const { conn } = require("../helpers/databaseConnection");
const { checkIfUserExist } = require("../helpers/databaseFuctions");

const login = async (req, res, next) => {
    let existingUser
    const {
        email,
        mobile,
        password
    } = req.body;

    try {
        conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
            verifyUser(result[0]);
        });
    }
    catch(err) {
        res.json({ 
            message: "Request failed. Check your internet connection or after sometime",
            userExist: false,
            loginSuccess: false,
            errorOccurred: true });
        return;
    }

    const verifyUser = data => {
        if(!data) {
            res.json({ 
                message: "No user find for provided data. Please register first",
                userExist: false,
                loginSuccess: false,
                errorOccurred: false,
                data: data });
        }
        if(data) {
            console.log(data);
            if(data.password === password) {
                res.json({ 
                    message: "Logged In",
                    userExist: true,
                    loginSuccess: true,
                    errorOccurred: false,
                    data: data });
            }
            if(data.password !== password) {
                res.json({ 
                    message: "Please enter valid credentials",
                    userExist: true,
                    errorOccurred: false,
                    loginSuccess: false });
            }
        }
    }
};

const createUser = async (req, res, next) => {
    const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        secondary_contact: req.body.secondary_contact,
        role_id: req.body.role_id,
        class: req.body.class_of_studying,
        year_of_adm: req.body.year_of_adm,
        created_at: req.body.created_at,
        photo: req.body.photo,
        password: req.body.password,
        designation: req.body.designation
    };

    const isUser = checkIfUserExist(req.body.email, req.body.mobile);

    console.log("isUser", isUser);

    conn.query(
        'INSERT INTO users SET ?', data,
            (error, result) => {
                if(error) {
                    console.log(error);
                }
                else {
                    res.json({
                        data: result
                    })
                }
            }
    )
};

const getUserById = async (req, res, next) => {};

const deleteUser = async (req, res, next) => {};

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;