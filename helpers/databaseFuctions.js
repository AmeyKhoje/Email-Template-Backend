const { conn } = require("./databaseConnection");

const checkIfUserExist = (email, mobile) => {
    let returnData = {};
    if(email && mobile) {
        let data;
        conn.query(`SELECT * FROM users WHERE email='${email}' AND mobile=${mobile}`, (error, result) => {
            data = result
        })
        return data
    }

    
};

exports.checkIfUserExist = checkIfUserExist;