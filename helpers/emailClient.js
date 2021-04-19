const { emailTransport } = require("./mailConfig");

// dotEnv.config()
const sendEmail = async (config, email) => {
    /* 
        ? This function sends email
        ? Accepts email config as parameters
        ? Returns new Promise which send response of email
    */
    let configs = {
        from: email,
        to: config.to,
        subject: config.subject,
        generateTextFromHTML: true,
        html: config.html,
        text: config.text
    };
    return new Promise((resolve, reject) => {
        emailTransport.sendMail(configs, (error, response) => {
            if(error) {
                // ? Email not sent(FAILED)
                reject(false)
            }
            if(response) {
                // ? Email sent successfully
                resolve(true)
            }
        })
        
    })
    
}

exports.sendEmail = sendEmail;