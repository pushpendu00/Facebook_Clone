const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    commentContent : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }
},{timestamps : true});

var commentModel = new mongoose.model('comment',commentSchema);

module.exports = commentModel;