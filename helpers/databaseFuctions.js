const { conn } = require("./databaseConnection");

const checkIfUserExist = async (email, mobile, callback) => {
    /* 
        ? This function checks is user exist already or not
        ? Accepts email and mobile as parameters
        ? Returns new Promise which send response of user if exist
    */
    return new Promise((resolve, reject) => {
        try {
            conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
                if(error) {
                    // ? If query fails promise rejected
                    reject({ isError: error });
                }
                // ? If query succeeded promise resolved
                resolve({ isError: error, result: result ? result[0] : null });
            })
        }
        catch(err) {
            // ? ERROR HANDLING
            console.log(err);
        }
    })
};

const getRoleByValue = async (value) => {
    /* 
        ? This function returns role
        ? Accepts role value as parameter
        ? Returns new Promise which send response of role
    */
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM roles where value='${value}'`, (error, result) => {
            if(error) {
                // ? Sql query failed
                reject({ isError: true });
            }
            // ? SQL query success
            resolve({ isError: error, result: result ? result[0] : null });
        })
    })
}

exports.checkIfUserExist = checkIfUserExist;
exports.getRoleByValue = getRoleByValue;