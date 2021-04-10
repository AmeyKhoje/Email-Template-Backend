const { conn } = require("../helpers/databaseConnection");
const { sendEmail } = require("../helpers/emailClient");

const sendEmails = async (req, res, next) => {
    const { recipients, title, message } = req.body;

    const mailConfig = {
        to: recipients,
        subject: title,
        text: message
    }

    const sentEmail = await sendEmail(mailConfig);
    if(!sentEmail) {
        res.json({
            isError: true,
            message: "Failed to send email. Try after some time."
        })
    }
    await storeEmails(recipients, mailConfig.subject, mailConfig.text);
    res.json({
        isError: false,
        message: "Email sent successfully."
    });
};

const storeEmails = async (data, title, text) => {
    const recipientsString = data.toString();
    const dataToStore = {
        sender: "ameykhoje@gmail.com",
        receivers: recipientsString,
        title: title,
        message: text
    }
    
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO emails set ?", dataToStore, (error, resp) => {
            if(error) {
                reject(false)
            }
            if(resp) {
                resolve(true)
            }
        })
    });
};

exports.sendEmails = sendEmails;