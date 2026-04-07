const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");
const logger = require("../controllers/logger.controller");


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: `"TRIVON FASHION" <${smtpUserName}>`, // sender address
            to: emailData.email, // list of recipients
            subject: emailData.subject, // subject line
            html: emailData.html, // HTML body
        };
        const info = await transporter.sendMail(mailOptions);

        logger.info("Message sent: %s", info.messageId);
        logger.info("Message sent: %s", info.response);
    } catch (err) {
        logger.error("Error while sending mail:", err);
        throw err;
    }
}



module.exports = emailWithNodeMailer;