const { conn } = require("../helpers/databaseConnection");
const { checkIfUserExist, getRoleByValue } = require("../helpers/databaseFuctions");
const { sendEmail } = require("../helpers/emailClient");
const dotEnv = require("dotenv");

dotEnv.config();

const login = async (req, res, next) => {
    const {
        email,
        mobile,
        password
    } = req.body;

    try {
        // ? Select user data from database for entered details
        conn.query(`SELECT id, first_name, last_name, email, mobile, secondary_contact, role_id, class, year_of_adm, created_at, photo, designation, password from users where email='${email}' AND mobile=${mobile}`, (error, result) => {
            // ? Verify results
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
                return;
        }
        if(data) {
            if(data.password === password) {
                let dataToSend =  data;
                delete dataToSend['password'];
                res.json({ 
                    message: "Logged In",
                    userExist: true,
                    loginSuccess: true,
                    errorOccurred: false,
                    data: dataToSend });
                    return;
            }
            if(data.password !== password) {
                res.json({ 
                    message: "Please enter valid credentials",
                    userExist: true,
                    errorOccurred: false,
                    loginSuccess: false });
                    return;
            }
        }
    }
};

const createUser = async (req, res, next) => {
    // ? To register user
    const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        secondary_contact: req.body.secondary_contact,
        role_id: null,
        class: req.body.class_of_studying,
        year_of_adm: req.body.year_of_adm,
        created_at: req.body.created_at,
        photo: req.body.photo,
        password: req.body.password,
        designation: req.body.designation,
        email_sent: null
    };

    const role_value = req.body.role_value

    // ? Check if user exist
    const isUser = await checkIfUserExist(req.body.email, req.body.mobile);

    if(isUser.isError) {
        res.json({
            isError: true,
            message: "Error occurred while checking user. Please try after some time."
        });
    }
    else {
        if(!isUser.result) {
            const role = await getRoleByValue(role_value);
            if(role.isError) {
                res.json({
                    isError: true,
                    message: "Error occurred while finding role. Please try after some time."
                });
            }
            else {
                if(!role.result && !role.isError) {
                    res.json({
                        isError: true,
                        message: "You selected wrong role. We don't have this role."
                    });
                    return;
                }
                if(role.result && !role.isError) {
                    const finalData = {
                        ...data,
                        role_id: role.result.id
                    }
                    conn.query(
                        'INSERT INTO users SET ?', finalData,
                            async (error, result) => {
                                if(error) {
                                    console.log(error);
                                }
                                else {
                                    const mailConfig = {
                                        to: data.email,
                                        subject: "Welcome to Email Template",
                                        html: `
                                            <div>
                                                <h3>Welcome ${data.first_name} ${data.last_name}<h3>
                                                <span>
                                                    This is welcome email. We hope you will like this platform.
                                                </span>
                                            </div>
                                        `
                                    };

                                    // ? Send email after successful registration
                                    await sendEmail(mailConfig);

                                    // ? Send user details
                                    conn.query(`SELECT id, first_name, last_name, email, mobile, secondary_contact, role_id, class, year_of_adm, created_at, photo, designation from users where email='${finalData.email}'`, (error, response) => {
                                        if(error) {
                                            console.log(error);
                                        }
                                        res.json({
                                            message: "User created successfully.",
                                            userCreated: true,
                                            data: response[0],
                                            isError: false
                                        });
                                    })
                                }
                            }
                    );
                }
            }
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
    // ? This function gets user by id
    const id = req.params.userId;

    try {
        conn.query(`SELECT id, first_name, last_name, email, mobile, secondary_contact, role_id, class, year_of_adm, created_at, photo, designation from users where id='${id}'`, (error, result) => {
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