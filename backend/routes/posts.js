const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const Post = require('../models/Posts');
const { body, validationResult } = require('express-validator');
const User = require("../models/User");

router.get('/fetchposts', fetchUser, async (req, res) => {
    
        try{
           const posts = await Post.find({ user: req.user.id });
           res.json(posts);
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    
});

router.get('/fetchpost/:id', async (req, res) => { 
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }
        res.json(post);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.post('/createpost', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('content', 'Content must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try{
        const { title, content } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

       

        const post = new Post({
            title, content, user: req.user.id, name: req.user.name
        })

        const savedPost = await post.save();
        res.json({success: "Post created successfully",savedPost});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.put('/updatepost/:id', fetchUser, async (req, res) => {

    const { title, content } = req.body;
    const errors = validationResult(req);

    try{
        const newPost = {};
        
        if(title){ 
            newPost.title = title;
        }
        if(content){
            newPost.content = content;
        }
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send("Not Found");
        }

        // if (post.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true });
        res.json({ post });

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.delete('/deletepost/:id', fetchUser, async (req, res) => {

    try{

        
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send("Not Found");
        }

        // if (post.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        post = await Post.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Post has been deleted", post: post });

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.get('/fetchallposts', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchuser/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const { name, email } = user;
        res.json({ name, email });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;