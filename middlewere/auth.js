const jwt = require('jsonwebtoken');
const userModel = require('../models/userSchema');

const auth  = async (req,res,next)=>{
    try{
        // console.log(req.cookies.jwt);
        if(!req.cookies.jwt){return res.redirect('/login');}
        const verifyUser = jwt.verify(req.cookies.jwt,process.env.jwt_secret);
        // console.log(verifyUser);
        var user = await userModel.findOne({_id : verifyUser.userId});
        if(!user){
            return res.redirect('/login');
        }
        req.id = user._id;
        next();
    }catch(e){
        console.log(e);
        return res.send('Authentication error : 401');
    }
}


module.exports = auth;