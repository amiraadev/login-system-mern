const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer")

let mailTransporter = nodemailer.createTransport({
    service:"yahoo",
    auth :{
        //  user:process.env.GMAIL_USER,
        //  pass:process.env.GMAIL_PASS       
         user:"allagui_fawzi@outlook.fr",
         pass:"A12648659a"       
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

  module.exports = { sendEmail }