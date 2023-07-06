const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.models'); 

const {signup} = require('../controllers/user.controller');


userRouter.post('/signup', signup);

module.exports = userRouter;



 