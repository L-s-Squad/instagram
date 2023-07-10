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

async function generateAndSendOtp(savedUser){
    let otp = generateOtp();
    let updatedUser = await User.findByIdAndUpdate(savedUser._id, {
        phone_otp: "123456",
        phone_otp_time: Date.now()
    }, {new: true})
    // sendSms(`Your otp is ${otp}`, savedUser.phone);
    // return updatedUser;
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

            generateAndSendOtp(savedUser);
            return sendResponse(res, 200, true, "User created successfully", savedUser);
        }
        catch(err){
            return sendResponse(res, 400, false, "User not created", err.message);
        }
     
}

const verifyOtp = async (req, res, next) => {
    let {otp, userId} = req.body;
    if(!otp || !userId){
        return sendResponse(res, 400, false, "All fields are required", "");
    }
    try{
       const foundUser =  await User.findById({_id: userId})
         console.log("XYZ",foundUser);
         if(!foundUser){
                return sendResponse(res, 400, false, "User not found", "");
         }
            if(foundUser.phone_otp != otp){
                 console.log(foundUser.phone_otp);
                    console.log(otp);
                return sendResponse(res, 400, false, "Otp is incorrect", "");
            }
            if(foundUser.phone_otp_time+ 1*60*1000 < Date.now()){
                console.log(foundUser.phone_otp_time);
                return sendResponse(res, 400, false, "Otp is expired, Request a new One", "");
            }
            let updatedUser = await User.findByIdAndUpdate({_id: userId}, {phone_verified: true}, {new: true});

            return sendResponse(res, 200, true, "Otp verified successfully", updatedUser);

    }
    catch(err){
        return sendResponse(res, 400, false, "User not found", "");
    }

}

const resendOtp = async (req, res, next) => {
   let {userId} = req.body;

   if(!userId){
    return sendResponse(res, 400, false, "All fields are required", "");
   }
   try{
      const foundUser =  await User.findById({_id: userId})
        if(!foundUser){
                return sendResponse(res, 400, false, "User not found", "");
        }
        generateAndSendOtp(foundUser);
        return sendResponse(res, 200, true, "Otp sent successfully", foundUser);
   }

    catch(err){
        return sendResponse(res, 400, false, "User not found", "");
    }

}


const login = async (req, res, next) => {

}

const forgotPassword = async (req, res, next) => {

}

const changePassword = async (req, res, next) => {

}


module.exports = {signup, verifyOtp, resendOtp}