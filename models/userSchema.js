const { default: mongoose } = require('mongoose');
const db = require('../config/connectionDb');

const multer = require('multer');
const path = require('path');
const avatar_path = path.join('/uploads/avatar');
// console.log(path.join('..',avatar_path));

var userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        // default : '/image/profile.png'
    },
    // friend : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId
    //     }
    // ]
    friendContact : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'friend'
    }
},{ timestamps: true });


let storage = multer.diskStorage({
    destination : function(req,file,cb){
        // coding ninjas
        cb(null,path.join(__dirname,'..',avatar_path));
        // me
        // cb(null,path.join('..',avatar_path));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now());
    }
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = avatar_path;

var userModel = new mongoose.model('user',userSchema);


module.exports = userModel;