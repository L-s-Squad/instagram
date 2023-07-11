const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const postRouter = express.Router();
const { createPost } = require('../controllers/post.controller');


postRouter.post('/create', authMiddleware, createPost);


module.exports = postRouter;