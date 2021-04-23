const { conn } = require("../helpers/databaseConnection");
const { checkIfEmailStarred } = require("../helpers/databaseFuctions");
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
};

const makeEmailStarred = async (req, res, next) => {
    const { id, sender } = req.body;
    const starredEmail = await checkIfEmailStarred(id, sender);

    if(starredEmail.isError) {
        return;
    }
    if(!starredEmail.isError) {
        if(starredEmail.result.starred === 1) {
            try {
                conn.query(`UPDATE emails SET starred=false where id='${id}' AND sender='${sender}'`, (error, result) => {
                    if(error) {
                        res.json({
                            isError: true,
                            message: "Failed to star email."
                        });
                        return;
                    }
                    if(result) {
                        res.json({
                            isError: false,
                            message: "Email starred successfully."
                        });
                        return;
                    }
                });
                return;
            }
            catch(error) {
                res.json({
                    isError: true,
                    message: "Server error."
                });
                return;
            }
        }
        try {
            conn.query(`UPDATE emails SET starred=true where id='${id}' AND sender='${sender}'`, (error, result) => {
                if(error) {
                    res.json({
                        isError: true,
                        message: "Failed to star email."
                    });
                    return;
                }
                if(result) {
                    res.json({
                        isError: false,
                        message: "Email starred successfully."
                    });
                    return;
                }
            })
        }
        catch(error) {
            res.json({
                isError: true,
                message: "Server error."
            });
        }
    }
    
};

exports.sendEmails = sendEmails;
exports.getAllEmailsSentByMe = getAllEmailsSentByMe;
exports.makeEmailStarred = makeEmailStarred;