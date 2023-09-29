const path = require('path');
const commentModel = require('../models/commentSchema');
const postModel = require('../models/postSchema');
const likeModel = require('../models/like_Schema');
const fs = require('fs');

module.exports.create_post = async (req,res)=>{
    // console.log(req.body.postContent);
    // console.log(req.body.postContent);
    // console.log(req.id);
    // console.log(req.file);
    try{
        if(req.file && req.body.postContent != ""){
            var newPost = new postModel({
                content : req.body.postContent,
                post_photo : postModel.upload_path + "/" + req.file.filename,
                user : req.id              
            });
            // console.log("both");
            await newPost.save();
        }else if(!req.file && req.body.postContent != ""){
            var newPost = new postModel({
                content : req.body.postContent,
                user : req.id        
            });
            // console.log("text");
            await newPost.save();
        }else if(req.file && req.body.postContent == ""){
            var newPost = new postModel({
                post_photo : postModel.upload_path + "/" + req.file.filename,
                user : req.id
            });
            // console.log("file");
            await newPost.save();
        }
        else{
            // console.log("nothing");
            return res.redirect('/');
        }
        // await newPost.save();
        // console.log(post);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.send("post was not posted");
    }
   
}

module.exports.delete_post = async (req,res)=>{
    // req.params.id
    try{
        let unlink_post_path = await postModel.findById({_id : req.params.id});
        // console.log(unlink_post_path);
        // delete post image from stored location
        if(unlink_post_path.post_photo){
            fs.unlinkSync(path.join(__dirname,"..",unlink_post_path.post_photo));
        }
        // delete post
        let deleted_post = await postModel.findByIdAndDelete({_id : req.params.id});
        // delete all coment
        await commentModel.deleteMany({post : deleted_post._id});
        // delete all likes
        await likeModel.deleteMany({post : deleted_post._id});
        return res.json({
            message : 'Successfully deleted',
            status : 1
        });
    }catch(err){
        console.log(err);
        return res.json({
            message : 'Somthing went wrong!!',
            status : 0
        });
        // return res.redirect('/');
    }
}