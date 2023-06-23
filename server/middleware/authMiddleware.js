const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler')

const protect = asyncHandler (async(req,res,next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
            console.log(decoded.email);
            req.user = await userModel.findOne({email:decoded.email}).select('-password');
            console.log(req.user);
            next()
        } catch (error) {
            console.log(error);
            res.status(405).json({error :"not authorized"})
        }
    }

    if(!token){
        res.status(401).json({error :"not authorized , no token"})

    }
})
module.exports = protect