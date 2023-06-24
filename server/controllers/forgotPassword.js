const dotenv = require('dotenv')
dotenv.config();

const { getUserByMail } = require("../usefullMethods");
const Joi = require('@hapi/joi')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {generateToken} = require('../token-config');


const validateLogin = Joi.object({
    email: Joi.string().min(6).required(),
})

async function forgotPassword (req,res) {

    const {email} = req.body ;
    
    try {
        const {error} = await validateLogin.validateAsync({email})
    
        if (error){
            return res.status(401).json({error:error.details[0].message})
        }
    
        const user = await getUserByMail (email);
        if (!user) {
            return res.status(402).json({error:"there is no such user with this email address "})
        }

        const token = generateToken(user.email);
        const link = `http://localhost:${process.env.PORT}/reset-password/${user.id}/${token}`;
        console.log(link);
        return res.status(200).json({
                    message:"A link was send to your address mail to reset your password",                  
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.email)
                })

    } catch (error) {
        res.status(404).json({error:error.message})
        
    }

}

module.exports = forgotPassword ;