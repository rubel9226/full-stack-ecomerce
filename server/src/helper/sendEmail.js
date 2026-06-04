const createError = require("http-errors");
const emailWithNodeMailer = require("./email");

const sendEmail = async (emailData) => {
    try {
        await emailWithNodeMailer(emailData);
    } catch (emailError) {
        console.log(emailError);
        throw createError(500, 'Failed to send verification email.');
    }
}

module.exports = sendEmail;