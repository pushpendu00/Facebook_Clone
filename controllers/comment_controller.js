const commentModle = require('../models/commentSchema');
const postModel = require('../models/postSchema');

module.exports.comment = async (req,res)=>{
    // console.log(req.body);
    try{
        let post = await postModel.findOne({_id : req.body.post});
        if(post){
            var addNewComment  = new commentModle({
                commentContent : req.body.commentContent,
                user : req.id,
                post : req.body.post
            });
            var user_comment = await addNewComment.save();
            await await postModel.findByIdAndUpdate(post._id,{
                $push : {
                    comment :  user_comment._id
                }
            });
            return res.redirect('/');
        }
        return res.status(404).json({
            message : "Post is not found! please reload this page"
        });
    }catch(err){
        console.log(err);
        // return res.redirect('/user');
        return res.status(500).json({
            message : "server error! please reload this page or re-login"
        });
    }
}

module.exports.delete_coment = async (req,res)=>{
    try{
        let deleted_coment = await commentModle.findByIdAndDelete({_id : req.params.id});
        await postModel.findByIdAndUpdate({ _id : deleted_coment.id },
            {
                $pull : {
                    comment : req.params.id
                }
            });
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}