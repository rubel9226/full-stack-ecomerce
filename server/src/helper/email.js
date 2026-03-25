const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

// console.log('hello!')
// console.log(smtpUserName)
// console.log(smtpPassword)

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

// Production email transporter


// const transporter = nodemailer.createTransport({
//   service: "gmail",          // Gmail service, Nodemailer auto config
//   auth: {
//     user: smtpUserName,  // Gmail app password account
//     pass: smtpPassword,  // App Password (no spaces!)
//   },
// });

const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: `"Ecommerce App" <${smtpUserName}>`, // sender address
            to: emailData.email, // list of recipients
            subject: emailData.subject, // subject line
            html: emailData.html, // HTML body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message send: %s', info.response);
    } catch (error) {
        console.error('Error occured while sending email: ', error)
        throw error;
    }
}

module.exports = emailWithNodeMailer;