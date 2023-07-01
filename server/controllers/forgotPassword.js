const dotenv = require('dotenv')
dotenv.config();
const { getUserByMail } = require("../usefullMethods");
const Joi = require('@hapi/joi')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {generateToken} = require('../token-config');
const { sendEmail } = require('../send-email');
const emailText = require('../email-text');
const Mailgen = require('mailgen');


// IF WE CHOOSE TO WORK WITH OTP

// const crypto = require('crypto');
// const generateOTP = () => {
//   return crypto.randomBytes(6).toString('hex');
// };

// const OTP = () => {
//   const otp = generateOTP();
//   console.log(otp);
//   return otp;
// };
// OTP();



// MAIL GENERATOR
let mailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:'https://mailgen.js/'
    }
})


//MAIL VERIFICATION
const validateLogin = Joi.object({
    email: Joi.string().min(6).required(),
})

const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const { error } = await validateLogin.validateAsync({ email });
  
      if (error) {
        return res.status(401).json({ error: error.details[0].message });
      }
  
      const user = await getUserByMail(email);
      if (!user) {
        return res.status(402).json({ error: "there is no such user with this email address" });
      }
  
      const token = generateToken(user.email);
      const link = `http://localhost:${process.env.PORT}/api/verify-link/${user.id}/${token}`;
      console.log(link);
  
      let response = {
        body: {
            name:"Amira Code ",
            intro:"Arequest has been received to change the password for your account",
            table: {
                data:[
                    {
                    item : "copy the following link and paste it in the link field",
                    item : "link:"+link,
                    description : "",
                    }
                ]
            },
            outro :"thank you,"
        }
    }
    
    let mail = mailGenerator.generate(response)

      sendEmail(email,mail);

      return res.status(200).json({
        message: "A link was send to your address mail to reset your password",
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.email),
      });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };
  
  module.exports = forgotPassword;
  