const express = require('express');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const authMiddleware = require('../middleware/authMiddleware');
const sendResponse = require('../utilities/sendResponse');


// upload image to s3

// create a new post
const createPost = async (req, res) => {
    let { title, body, image_link } = req.body;
    let user_id = req.user._id;
    if (!title) {
        return sendResponse(res, 400, "Title is required");
    }
    if (!body && !image_link) {
        return sendResponse(res, 400, "Post should have atleast one of body or image_link");
    }
    try{
        let post = new Post({ title, body, image_link, user_id });
        let newPost = await post.save();
        return sendResponse(res, 200, "Post created successfully", newPost);
    }
    catch(err){
        return sendResponse(res, 500, "Internal server error");
    }
    
}

// update a post

// delete a post

// get all posts

// get a single post






module.exports = {createPost}
// insta app:  


//=>token based authentication 
//=> session based authentication
//=> passport.js