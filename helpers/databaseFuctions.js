const { conn } = require("./databaseConnection");

const checkIfUserExist = async (email, mobile, callback) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
            if(error) {
                reject({ isError: error });
            }
            resolve({ isError: error, result: result[0] ? result[0] : null });
        })
    })
};

exports.checkIfUserExist = checkIfUserExist;