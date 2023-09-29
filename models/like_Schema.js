
const { default: mongoose, mongo } = require('mongoose');



var likeSchema = mongoose.Schema({
    like : {
        type : Boolean,
        required : true
        // default : "false"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }
});

const likeModel = mongoose.model('like',likeSchema);


module.exports = likeModel;