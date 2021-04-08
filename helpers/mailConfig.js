const mailer = require("nodemailer");
const dotEnv = require("dotenv");
const xoauth2 = require("xoauth2");

dotEnv.config()

const generator = xoauth2.createXOAuth2Generator({
    user: process.env.EMAIL_MY_EMAIL,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: process.env.EMAIL_ACCESS_TOKEN
})

const emailTransport = mailer.createTransport({
    service: "gmail",
    auth: {
        type: "oauth2",
        user: process.env.EMAIL_MY_EMAIL,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: process.env.EMAIL_ACCESS_TOKEN,
    }
});

const getMailConfig = (config) => {
    return {
        from: process.env.EMAIL_MY_EMAIL,
        to: config.to,
        subject: config.subject,
        generateTextFromHTML: true,
        html: config.html
    };
}

exports.emailTransport = emailTransport;
exports.getMailConfig = getMailConfig;