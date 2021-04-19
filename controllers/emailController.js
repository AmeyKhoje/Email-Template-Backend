const { conn } = require("../helpers/databaseConnection");
const { sendEmail } = require("../helpers/emailClient");

const sendEmails = async (req, res, next) => {
    const { recipients, title, message } = req.body;
    const userInfoFromHeaders = req.userData;

    const mailConfig = {
        to: recipients,
        subject: title,
        text: message
    }

    const sentEmail = await sendEmail(mailConfig, userInfoFromHeaders.email);
    if(!sentEmail) {
        res.json({
            isError: true,
            message: "Failed to send email. Try after some time."
        })
    }
    await storeEmails(recipients, mailConfig.subject, mailConfig.text, userInfoFromHeaders.email);
    res.json({
        isError: false,
        message: "Email sent successfully."
    });
};

const storeEmails = async (data, title, text, sender) => {
    const recipientsString = data.toString();
    const dataToStore = {
        sender: sender,
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

const getAllEmailsSentByMe = (req, res, next) => {
    let userInfoFromHeaders = req.userData;
    if(userInfoFromHeaders) {
        try {
            conn.query(`SELECT * from emails where sender='${userInfoFromHeaders.email}'`, (error, result) => {
                if(error) {
                    res.json({
                        isError: true,
                        message: "Failed to get emails."
                    });
                    return;
                }
                if(result) {
                    res.json({
                        isError: false,
                        message: "Emails found successfully",
                        data: result
                    });
                    return;
                }
            })
        }
        catch(error) {
            res.json({
                isError: true,
                message: "Failed to get emails."
            });
            return;
        }
    }
}

exports.sendEmails = sendEmails;
exports.getAllEmailsSentByMe = getAllEmailsSentByMe;