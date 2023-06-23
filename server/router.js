//Libraries
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require("@hapi/joi")
//models
const userModel = require('./models/userModel');
//controllers
const  validateRegister  = require('./controllers/registerValidation');
const loginValidation = require('./controllers/loginValidation');


const protect = require('./middleware/authMiddleware');
const { getMe } = require('./token-config');


const router = express.Router()


  router.get('/me',protect,(req,res) => getMe(req,res));

  router.post('/api/register',(req,res) => validateRegister(req,res));
  router.post('/api/login',(req,res) => loginValidation(req,res));


  // router.get('/api/login',(req,res) => {
  //   res.send("hellelouuuya")
  // });


module.exports = router;