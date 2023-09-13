const commentModel = require('../models/commentSchema');
const postModel = require('../models/postSchema');

module.exports.post = async (req,res)=>{
    // console.log(req.body);
    // console.log(req.body.postContent);
    // console.log(req.id);
    try{
        var newPost = new postModel({
            content : req.body.postContent,
            user : req.id
        });
        var post = await newPost.save();
        // console.log(post);
        return res.redirect('./');
    }catch(err){
        console.log(err);
        return res.send("post was not posted");
    }
   
}

module.exports.delete_post = async (req,res)=>{
    // req.params.id
    try{
        let deleted_post = await postModel.findByIdAndDelete({_id : req.params.id});
        let del_comment = await commentModel.deleteMany({post : deleted_post._id});
        // console.log(deleted_post);
        // console.log(del_comment);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
}