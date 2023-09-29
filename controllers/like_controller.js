const { default: mongoose } = require('mongoose');
const likeModel = require('../models/like_Schema');
const postModel = require('../models/postSchema');
// const { post } = require('./post_controller');

module.exports.like = async (req,res)=>{
    try{
        let postId = new mongoose.Types.ObjectId(req.params.id);
        let post = await postModel.findOne({_id : postId});
        // check post are available or not
        if(post){
            let like = await likeModel.findOne({post : postId,user : req.id});
            // check like are availavle or not
            if(like){
                // like is available
                // remove (delete) like id from post model and decrement total like
                let update_post = await postModel.findByIdAndUpdate(postId,{
                    $pull : {
                        like : like._id
                    },
                    $inc : {
                        totalLike : -1
                    }
                });
                // then, delete like id from like collection
                await likeModel.findByIdAndDelete({_id : like._id});
                return res.json(
                    {
                        message : 'done',
                        like_status : 0,
                        id_post : `${post.user}-${postId}`,
                        total_like : update_post.totalLike
                    }
                );
            }else{
                // like are not available
                // create like object
                var newLike = new likeModel({
                    like : 'true',
                    post : postId,
                    user : req.id
                });
                let creat_like = await newLike.save();
                // store like id inside total like array and increment total like
                let update_post = await postModel.findByIdAndUpdate(postId,{
                    $push : {
                        like : creat_like._id,
                    },
                    $inc : {
                        totalLike : 1
                    }
                });
                return res.json(
                    {
                        message : 'done',
                        like_status : 1,
                        id_post : `${post.user}-${postId}`,
                        total_like : update_post.totalLike
                    }
                );
            }
        }else{
            console.log('post are not available');
            return res.json(
                {
                    message : 'Post are not available! please reload the page'
                }
            );
        }
    }catch(err){
        console.log("like error = ",err);
        return res.json({
            message : 'false'
        });
    }
}