const dotenv = require('dotenv')
dotenv.config();

const { getUserByMail } = require("../usefullMethods");
const Joi = require('@hapi/joi')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {generateToken} = require('../token-config');


const validateLogin = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
})

async function loginValidation (req,res) {

    const {email , password} = req.body ;
    
    try {
        const {error} = await validateLogin.validateAsync({email , password})
    
        if (error){
            return res.status(401).json({error:error.details[0].message})
        }
    
        const user = await getUserByMail (email);
        if (!user) {
            return res.status(402).json({error:"there is no such user with this email address "})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch){
            return res.status(403).json({error:"Invalid email or password "})
        }

        return res.status(200).json({
                    message:"successfully logged in :)",                  
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.email)
                })

    } catch (error) {
        res.status(404).json({error:error.message})
        
    }

}

module.exports = loginValidation ;