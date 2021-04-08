const mailer = require("nodemailer");
const dotEnv = require("dotenv");
const { emailTransport } = require("./mailConfig");

// dotEnv.config()

const sendEmail = async (config) => {
    let configs = {
        from: process.env.EMAIL_MY_EMAIL,
        to: config.to,
        subject: config.subject,
        generateTextFromHTML: true,
        html: config.html
    };
    return new Promise((resolve, reject) => {
        emailTransport.sendMail(configs, (error, response) => {
            if(error) {
                console.log(error);
                reject(false)
            }
            if(response) {
                console.log(response);
                resolve(true)
            }
        })
        
    })
    
}

exports.sendEmail = sendEmail;