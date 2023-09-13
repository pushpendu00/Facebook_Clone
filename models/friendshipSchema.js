const mongoose = require('mongoose');

var friendshipSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        // unique : true
    },
    sendRequest : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
            // unique : true
        }
    ],
    receveRequest : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
            // unique : true
        }
    ],
    allfriend : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ]
});

var friendModel = new mongoose.model('friend',friendshipSchema);

module.exports = friendModel;