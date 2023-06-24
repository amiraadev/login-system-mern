const dotenv = require('dotenv')
dotenv.config();
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = require('./models/userModel');



const generateToken = (email) =>{
     return jwt.sign({email},process.env.TOKEN_SECRET,{expiresIn:"3d"})
}

const verifyToken = (token, email) => {
     return jwt.verify(token, process.env.TOKEN_SECRET, { email });
   }

const getMe = asyncHandler(async (req,res) => {
     const {name,email} = await userModel.findOne({email:req.user.email})
     res.status(200).json({
          name,
          email
     })
}) 

module.exports = {generateToken,getMe,verifyToken}