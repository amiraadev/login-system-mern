const userModel = require('../models/userModel');
const Joi = require("@hapi/joi")
const bcrypt = require('bcrypt');
const {generateToken} = require('../token-config');


const regiterValidate = Joi.object({
   name : Joi.string().min(4).required(),     
   email : Joi.string().min(6).required().email(),     
   password : Joi.string().min(6).required()   
})

const findWord = (sentence, word) => {
  const stringSentence = String(sentence)
  const index = stringSentence.indexOf(word);
  if (index === -1) {
    return false;
  } else {
    return true;
  }
};

 async function validateRegister(req,res){
    const {name,email,password} = req.body ;
    try {
        // name , email and password should be validated
        const { error ,details } = await regiterValidate.validateAsync(req.body)
         if (error) {
          if (details.length > 0) {
            return res.status(401).json({ error: details[0].message });
          } else {
            return res.status(402).json({ error: error.message });
          }
        }
        // hashing the password 
        const  salt = await bcrypt.genSalt(5);
        const  hashedPassword = await bcrypt.hash(req.body.password,salt);
        // adding the user to the DB
        const user = await userModel.create({name,email,password:hashedPassword})
        return res.status(200).json({
                    message : "user has been added",
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.email)
                })
    } catch (error) {
       if(findWord(error,"duplicate "))
         {
          return res.status(402).json({error:"Email belongs to an existing user"})
         }
      else
         return res.status(402).json({error:error.message})
        // return res.status(402).json({error:"Email belongs to an existing user"})
    }
}

module.exports =  validateRegister ;