const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator")
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middlewares/fetchUser');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res)=>{

    const errors = validationResult(req);

    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

     let user = await User.findOne({ email: req.body.email });
     if(user) {
        return res.status(400).json({success,  error: "Sorry a user with this email already exists" })
     }

     user = await User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
     })

     const data = {
        user:{
            id: user.id
        }
     }


     const authToken = jwt.sign(data, JWT_SECRET)  

     success = true;

     res.status(200).json({ success, authToken });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{

    const errors = validationResult(req);

    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {

     let user = await User.findOne({ email, password });
     if(!user) {
        success = false;
        return res.status(400).json({success,  error: "Please try to login with correct credentials" })
     }


     const data = {
        user:{
            id: user.id
        }
     }

     const authToken = jwt.sign(data, JWT_SECRET)


     success = true;

     res.json({success, authToken})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/getuser", fetchUser, async (req, res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId)
        res.send(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/updateuser", fetchUser, async (req, res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true})
        res.send(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;