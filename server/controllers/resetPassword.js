const userModel = require('../models/userModel');
const Joi = require("@hapi/joi")
const bcrypt = require('bcrypt');

const path = require('path');


const {generateToken, verifyToken} = require('../token-config');
const { getUserByMail } = require('../usefullMethods');


const resetPasswordValidate = Joi.object({    
  newPassword : Joi.string().min(6).required() ,  
   email : Joi.string().min(6).required()   
})


 async function resetPassword(req,res){
  const {email,newPassword} = req.body;


  try {
    const { error ,details } = await resetPasswordValidate.validateAsync(req.body)
    if (error) {
     if (details.length > 0) {
       return res.status(401).json({ error: details[0].message });
     } else {
       return res.status(402).json({ error: error.message });
     }
   }


    const user = await userModel.findOne({ email: email });
    const  salt = await bcrypt.genSalt(5);
    const  hashedPassword = await bcrypt.hash(newPassword,salt);
    if(user) {
      user.password = hashedPassword;
      user.save();
      return res.status(200).json({
        message : "Password updated",
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.email)
    })
    }
    
  } catch (error) {
    return res.status(408).json({error:error.message})
  }
  
}

module.exports =  resetPassword ;