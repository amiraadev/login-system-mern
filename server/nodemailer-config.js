const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer")

let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.PASSWORD,
    }
})



function sendEmail(mailDetails) {
    return new Promise((resolve, reject) => {
      mailTransporter.sendMail(mailDetails, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

//  module.exports = { sendEmail }