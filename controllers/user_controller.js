const userModel = require('../models/userSchema');
const postModel = require('../models/postSchema');
// const { populate } = require('dotenv');
const friendModel = require('../models/friendshipSchema');

module.exports.user = async(req,res)=>{
    // console.log("user id = ",req.id);
    try{
        let recent_user = await userModel.findById(req.id);
        let recent_user_receved = await userModel.findById(req.id).populate({
            path : 'friendContact', 
                populate : {
                    path : 'receveRequest'
                }
            });
            let recent_user_friend = await friendModel.findOne({user : req.id}).populate('user')
            .populate({
                path : 'allfriend'
            });
        // console.log(recent_user_friend);
        // console.log(recent_user_receved);
        let post = await postModel.find().populate('user')
        .populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        }).populate({
            path : 'like',
            populate : {
                path : 'user'
            }
        });
        let allUser = await userModel.sort({createdAt:-1}).find();
        // console.log(post[0].like[0].id);
        if(recent_user){
            return res.render('user',{
                recent_user : recent_user,
                post : post,
                allUser : allUser,
                // recent_user_send : recent_user_send,
                recent_user_receved : recent_user_receved,
                recent_user_friend : recent_user_friend

            });
        }
        // console.log(post);
        return res.redirect('/login');
    }catch(e){
        console.log(e);
        // return res.send("user not found ! Error!!!");
        return res.status(200).json({
            message : "user not found ! Error!!!"
        });
    }
}



