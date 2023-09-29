const userModel = require('../models/userSchema');
const postModel = require('../models/postSchema');

const fs = require('fs');
const path = require('path');

module.exports.profileMy = async (req,res)=>{
    try{
        let user = await userModel.findById({_id : req.id});
        let post = await postModel.find({user : user._id}).populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        });
        if(user){
            return res.render('profile',{
                user : user,
                post : post
            });
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.profileById = async (req,res)=>{
    // console.log(req.params);
    try{
        // let login_user = await userModel.findById(req.id);
        let user = await userModel.findById({_id : req.params.id});
        let post = await postModel.find({user : user._id}).populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        });
        if(user){
            return res.render('profile',{
                user : user,
                post : post,
                login_user : req.id
            });
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.uploaded = async (req, res)=>{
    try{
        let user = await userModel.findById({_id : req.id});
        // console.log(user);
        // if(user){
            userModel.uploadedAvatar(req,res,async ()=>{
                if(req.file)
                {
                    console.log(user.avatar);
                    if(user.avatar){
                        // console.log(path.join(__dirname));
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    await userModel.findByIdAndUpdate(user._id,{
                        avatar : userModel.avatarPath + '/' + req.file.filename
                    })
                    // user.avatar = userModel.avatarPath + '/' + req.file.filename;
                }
                // user.save();
                return res.redirect('back');
                // return res.redirect('user/profile');
            });
        // }
        // console.log(user.avatar);
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    // console.log(req.id);
}