const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

const jwt = require('jsonwebtoken');

const userModel = require('../models/userSchema');
const auth = require('../middlewere/auth');

router.get('/',(req,res,next)=>{
    if(req.cookies.jwt){
        return res.redirect('/user');
    }
    next();
},homeController.home);

router.use('/user',auth,require('./user'));


// access login page
router.use('/login',require('./login'));
// access register page
router.use('/register',require('./register'));



router.post('/login',async (req,res)=>{
    try{
        var user = await userModel.findOne({email : req.body.email});
        if(!user){
            return res.redirect('/register');
        }else if(user.password != req.body.password){
            return res.redirect('back');
        }
        // create jwt token
        const token = jwt.sign({
                userId : user._id
            },process.env.jwt_secret,
            {
                expiresIn : '30d'
            }
        );
        // store jwt token in cookie
        res.cookie('jwt',token,{
            expires : new Date(Date.now()+2592000),
            httpOnly : true
        });
        return res.redirect('/user');
    }catch(e){
        console.log(e);
        return res.send("login Failed");
    }
});

        // <===== logout (delete cookie data) =====> //
router.post('/log-out',(req,res)=>{
    res.clearCookie('jwt');
    return res.redirect('/');
});

// new user register post request 
router.post('/register',async (req,res)=>{
    try{
        var user = await userModel.findOne({email : req.body.email});
        if(user){
            return res.redirect('/login');
        }
        var newUser = new userModel({
            name : req.body.name,
            userName : req.body.userName,
            email : req.body.email,
            password : req.body.password
        });
        var user = await newUser.save();
        // create jwt token
        const token = jwt.sign({
                userId : user._id
            },process.env.jwt_secret,
            {
                expiresIn : '30d'
            }
        );
        // store jwt token in cookie
        res.cookie('jwt',token,{
            expires : new Date(Date.now()+2592000),
            httpOnly : true
        });
        return res.redirect('/user');
        // return res.redirect('/user');
    }catch(err){
        console.log(err);
        return res.send("Register error");
    }
});



module.exports = router;