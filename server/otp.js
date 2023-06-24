const dotenv = require('dotenv')
dotenv.config();
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = require('./models/userModel');
const otpGenerator = require('otp-generator');



export async function generateOTP(){
  let OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
}