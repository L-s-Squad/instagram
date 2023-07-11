const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sendResponse = require('../utilities/sendResponse');


const authMiddleware = async (req, res, next) => {
     try{
       let token = req.headers.authorization;
         if(!token){
            return sendResponse(res, 401, "Please login to access this resource");
         }
         token = token.split(" ")[1];
         if(!token){
            return sendResponse(res, 401, "Please login to access this resource");
         }
       let user = await  User.findOne({token: token})

         if(!user){
            return sendResponse(res, 401, "Please login to access this resource");
         }

            req.user = user;
            next();
     }

    catch(err){

    }

}

module.exports = authMiddleware;