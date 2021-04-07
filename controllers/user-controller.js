const { conn } = require("../helpers/databaseConnection");
const { checkIfUserExist } = require("../helpers/databaseFuctions");

const login = async (req, res, next) => {
    const {
        email,
        mobile,
        password
    } = req.body;

    try {
        conn.query(`SELECT id, email, mobile, password FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
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
                message: "No user found for provided data. Please register first",
                userExist: false,
                loginSuccess: false,
                errorOccurred: false });
        }
        if(data) {
            if(data.password === password) {
                res.json({ 
                    message: "Logged In",
                    userExist: true,
                    loginSuccess: true,
                    errorOccurred: false,
                    data: { email: data.email, id: data.id, mobile: data.mobile } });
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

    const isUser = await checkIfUserExist(req.body.email, req.body.mobile);

    if(isUser.isError) {
        res.json({
            isError: true,
            message: "Error occurred while checking user. Please try after some time."
        });
    }
    else {
        if(!isUser.result) {
            conn.query(
                'INSERT INTO users SET ?', data,
                    (error, result) => {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            res.json({
                                message: "User created successfully.",
                                userCreated: true,
                                data: result,
                                isError: false
                            });
                        }
                    }
            );
        }
        if(isUser.result) {
            res.json({
                message: "User already registered.",
                userCreated: false,
                isError: false
            });
        }
    }
};

const getUserById = async (req, res, next) => {
    const id = req.params.userId;

    try {
        conn.query(`SELECT id, email, first_name, last_name, mobile, password, secondary_contact, role_id, class, year_of_adm, created_at, photo, designation FROM users WHERE id='${id}'`, (error, result) => {
            if(error) {
                res.json({ 
                    message: "Request failed.",
                    userExist: false,
                    errorOccurred: true });
            }
            if(result[0]) {
                res.json({ 
                    message: "User found",
                    userExist: true,
                    errorOccurred: false,
                    data: result[0] });
            }
            if(!result[0]) {
                res.json({ 
                    message: "No user find.",
                    userExist: false,
                    errorOccurred: false });
            }
        });
    }
    catch(err) {
        res.json({ 
            message: "Request failed. Check your internet connection or after sometime",
            userExist: false,
            errorOccurred: true });
        return;
    }
};

const deleteUser = async (req, res, next) => {};

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;