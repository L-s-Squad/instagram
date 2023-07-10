const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.models'); 

const {signup, verifyOtp, resendOtp} = require('../controllers/user.controller');


userRouter.post('/signup', signup);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/resend-otp', resendOtp);

module.exports = userRouter;



 