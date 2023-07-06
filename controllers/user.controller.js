const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const User = require('../models/user.models');
const sendResponse = require('../utilities/sendResponse');

const signup = async (req, res,next) => {
     let {name, email, password, phone} = req.body;
     if(!name || !email || !password || !phone){
         return sendResponse(res, 400, false, "All fields are required", "");
     }
        let newUser = new User({
            name,
            email,
            password,
            phone
        })
        try{
            let savedUser = await newUser.save();
            return sendResponse(res, 200, true, "User created successfully", savedUser);
        }
        catch(err){
            return sendResponse(res, 400, false, "User not created", err);
        }
     
}

module.exports = {signup}