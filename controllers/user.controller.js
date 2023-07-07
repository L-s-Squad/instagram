const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const User = require('../models/user.models');
const sendResponse = require('../utilities/sendResponse');
const sendSms = require('../utilities/sendSms');
const sendEmail = require('../utilities/sendEmail');

function generateOtp(){
    let otp = Math.floor(Math.random() * 1000000);
    return otp;
}

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
            sendEmail({
                to: email,
                subject: "Welcome to the app",
                message: "We are so thrilled to have you come to our home. We are so excited to create fun and loving memories with you! Welcome to our home! Glad to have you back!"
            })
            let otp = generateOtp();
            // update the user with otp and otp time

            let updatedUser = await User.findByIdAndUpdate(savedUser._id, {
                phone_otp: otp,
                phone_otp_time: Date.now()
            }, {new: true})
            sendSms(`Your otp is ${otp}`, phone);
            return sendResponse(res, 200, true, "User created successfully", savedUser);
        }
        catch(err){
            return sendResponse(res, 400, false, "User not created", err);
        }
     
}

const verifyOtp = async (req, res, next) => {
    // email, user_id, otp
}

const resendOtp = async (req, res, next) => {

}


const login = async (req, res, next) => {

}

const forgotPassword = async (req, res, next) => {

}

const changePassword = async (req, res, next) => {

}


module.exports = {signup}