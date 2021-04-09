const { conn } = require("./databaseConnection");

const checkIfUserExist = async (email, mobile, callback) => {
    
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
            if(error) {
                console.log(error);
                reject({ isError: error });
            }
            resolve({ isError: error, result: result ? result[0] : null });
        })
    })
};

const getRoleByValue = async (value) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM roles where value='${value}'`, (error, result) => {
            if(error) {
                reject({ isError: true });
            }
            resolve({ isError: error, result: result ? result[0] : null });
        })
    })
}

exports.checkIfUserExist = checkIfUserExist;
exports.getRoleByValue = getRoleByValue;