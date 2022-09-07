const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { json } = require('express');

const JWT_SECRET = "HELL I VIPER";


//Route1: create a user using : Post
router.post('/createuser',[body('name','Enter a valid name').isLength({ min: 3 }) ,
    body('email','Enter a valid email').isEmail(),
    body('password','Atleast 5 character').isLength({ min: 5 })] ,
    async(req, res) => {
      //Checking errors
      let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    
    try {
      
    //check for same email
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success, error: "Email already exist"})
    }
    //create a new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user  = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      
        success = true;
        res.json({success , authtoken})
      } 
      catch (error) {
        console.log(error.message)
        res.status(500).send(success,"error occured")
      }
    })


    //Route2: Authenticate a user
    router.post('/login',[body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()] ,
    async(req, res) => {

     let success = false;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success ,  errors: errors.array() });
      }

      const {email,password} = req.body;
      
      try {
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({success , error:"Email Incorrect"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success = false;
          return res.status(400).json({success , error:"Password Incorrect"});
        }
        const data = {
          user:{
            id: user.id
          }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authtoken})
        

      } catch (error) {
        console.log(error.message)
        res.status(500).send(success , "Internal Server Error")
      }

    })

    //Route3: get loggedin user details.  Login required
    router.post('/getuser' , fetchuser , async(req, res) => {
      
      try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
      } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
      }
    
    })
     

module.exports = router