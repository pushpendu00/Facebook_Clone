const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
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
    ]
},{timestamps : true});


var postModel = new mongoose.model('post',postSchema);


module.exports = postModel;
