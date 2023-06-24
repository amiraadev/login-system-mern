const userModel = require('../models/userModel');
const Joi = require("@hapi/joi")
const bcrypt = require('bcrypt');

const path = require('path');


const {generateToken, verifyToken} = require('../token-config');
const { getUserByMail } = require('../usefullMethods');


const resetPasswordValidate = Joi.object({    
   password : Joi.string().min(6).required() ,  
   email : Joi.string().min(6).required()   
})

export function localVariables(req,res,next) {
  req.app.locals = {
    OTP :null,
    resetSession : false 
  }
  next();
}
 async function resetPassword(req,res){
  const {id,token} = req.params;
  try {
    const user = await userModel.findById(id)
    if(user) {
      const verify = verifyToken(token)
      const html = app.renderToHTML(req, res, '/your-component', { email });

      //console.log(verifyToken(token));  
      res.status(200).json({message:"verified "})   
    }
    
  } catch (error) {
    return res.status(408).json({error:"Not verified"})
  }
  //console.log({id,token});

  // const {name,email,password} = req.body ;
    // try {
    //     // name , email and password should be validated
    //     const { error ,details } = await resetPasswordValidate.validateAsync(req.body)
    //      if (error) {
    //       if (details.length > 0) {
    //         return res.status(401).json({ error: details[0].message });
    //       } else {
    //         return res.status(402).json({ error: error.message });
    //       }
    //     }
    //     // hashing the password 
    //     const  salt = await bcrypt.genSalt(5);
    //     const  hashedPassword = await bcrypt.hash(req.body.password,salt);
    //     // adding the user to the DB
    //     const user = await getUserByMail (email);
    //   if(user){
    //      // const updated_user = await userModel.updateOne(email,{password:hashedPassword})
    //       return res.status(200).json({
    //                   message : "Password has been updated",
    //                   _id: user.id,
    //                   name: user.name,
    //                   email: user.email,
    //                   token: generateToken(user.email)
    //               })
    //   }
    // } catch (error) {
    //     return res.status(402).json({error:error.message})
    //     // return res.status(402).json({error:"Email belongs to an existing user"})
    // }
}

module.exports =  resetPassword ;