//Libraries
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require("@hapi/joi")
//models
const userModel = require('./models/userModel');
//controllers
const  validateRegister  = require('./controllers/registerValidation');
const loginValidation = require('./controllers/loginValidation');
const forgotPassword = require('./controllers/forgotPassword');


const protect = require('./middleware/authMiddleware');
const { getMe } = require('./token-config');
const resetPassword = require('./controllers/resetPassword');
const verifLink = require('./controllers/verifLink');

const router = express.Router()


  router.get('/me',protect,(req,res) => getMe(req,res));

  router.post('/api/register',(req,res) => validateRegister(req,res));
  router.post('/api/login',(req,res) => loginValidation(req,res));
  router.post(`/api/forgot-password`,(req,res) => forgotPassword(req,res));
  router.get(`/api/reset-password/:id/:token`,(req,res) => resetPassword(req,res));
  router.get(`/api/verify-link/:id/:token`,(req,res) => verifLink(req,res));
  // router.get(`/api/reset-password`,(req,res) => resetPassword(req,res));

  

module.exports = router;