

const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

dotenv.config();
const html = `<h1>nodemailer mail </h1>`;

let mailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:'https://mailgen.js/'
    }
})

let response = {
    body: {
        name:"amira",
        intro:"your bill has arrived",
        table: {
            data:[
                {
                item : "Nodemailer Stack Book",
                description : "A backend application Stack Book",
                price : "$100",
                }
            ]
        },
        outro :"Looking forward to do more business"
    }
}

let mail = mailGenerator.generate(response)


async function sendEmail(userEmail,html_text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "medfawziallagui@gmail.com",
    // to: "allagui_amira@yahoo.com",
    to: userEmail,
    subject: "Subject of the email",
    html: html_text,
  });

  console.log("message sent", info);
}

//sendEmail(mail).catch(e => console.log(e));

module.exports = { sendEmail }








// user: "medfawziallagui@gmail.com",
// pass: "Aa05121993",