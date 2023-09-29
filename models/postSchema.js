const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const userModel = require('./userSchema');

const upload_location = path.join('/uploads/post_img');
var postSchema = mongoose.Schema({
    content : {
        type : String
    },
    post_photo : {
        type : String
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ],
    like : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'like'
        }
    ],
    totalLike : {
        type : Number,
        default : 0
    }
},{timestamps : true});


let storage = multer.diskStorage({
    destination : function(req,file,cb){
        try{
            // console.log(path.join(__dirname));
            cb(null,path.join(__dirname,'..',upload_location));
        }catch(err){
            console.log("multer error destination = "+err);
            return;
        }
        
    },
    filename : function(req,file,cb){
        try{
            let new_file_name = path.join(req.id+"-"+Date.now());
            // +'.'+file.mimetype.split('/')[1]);
            // console.log(" New file name = "+new_file_name);
            cb(null,new_file_name);
        }catch(err){
            console.log("multer error file name ="+err);
            return;
        }
    }
})

// Static file 
postSchema.statics.upload_photo = multer({storage : storage}).single('uploadPhoto');
postSchema.statics.upload_path = upload_location;

var postModel = new mongoose.model('post',postSchema);

module.exports = postModel;
