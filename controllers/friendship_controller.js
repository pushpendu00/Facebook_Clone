const { default: mongoose } = require('mongoose');
const friendModel = require('../models/friendshipSchema');
const userModel = require('../models/userSchema');

// add friend request
module.exports.add_Friend = async (req,res)=>{
    try{
        let u1=await userModel.findById({_id : req.id});
        let u2 = await userModel.findById({_id : req.params.id});
        if(!u1 || !u2){
            return res.json({
                message : 'User not found',
                flag_var : false
            });
        }
        // check user or requested friend  already present or not 
        let me = await friendModel.findOne({user : u1._id});
        let my_friend = await friendModel.findOne({user : u2._id});

        // if me are mot present
        // let create_me;
        if(!me){
            create_me = new friendModel({
                user : req.id
            });
            await create_me.save();
            me = create_me;
            // link friend schema to user
            await userModel.findByIdAndUpdate({_id : req.id},{
                friendContact : create_me._id
            });
        }else{
            for(friend of me.allfriend){
                if(friend == req.params.id){
                    return res.json({
                        message : 'This person already present your friend list',
                        flag_var : false
                    });
                }
            }
        }
         // if friend are not present 
         if(!my_friend){
            let create_my_friend = new friendModel({
                user : req.params.id
            });
            await create_my_friend.save();
            my_friend = create_my_friend;
            // link friend schema to user
            await userModel.findByIdAndUpdate({_id : req.params.id},{
                friendContact : create_my_friend._id
            });
        }

        // check this is send request are first time or not
        for(receveId of me.receveRequest){
            // console.log(receveId);
            // console.log(req.id);
            if(receveId == req.params.id){
                return res.json({
                    message : 'user Already Send Request. go to friend request section and confirm request',
                    flag_var : false
                });
            }
        }
        for(sendId of me.sendRequest){
            // console.log(sendId);
            if(sendId == req.params.id){
                return res.json({
                    message : 'you have Already Send Request',
                    flag_var : false
                });
            }
        }
        // $ push friend id => login user sendRequest fild
        await friendModel.findByIdAndUpdate(me._id,{
            $push : {
                sendRequest : req.params.id
            }
        });
        // my id srore to requested feiend id ( in receved fild )
        await friendModel.findByIdAndUpdate(my_friend._id,{
            $push : {
                receveRequest : req.id
            }
        });
        // return json formet with message
        return res.json({
            message : 'Request Successfully Send',
            flag_var : true
        });
    }catch(err){
        console.log(err);
        return res.json({
            message : "you cannot add friend! Internal server problrm!!",
            flag_var : false
        });
    }
}



// accept friend request
module.exports.accept_request = async (req,res)=>{
    let id = req.params.id;
    try{
        // find user details (friend related) from friend schema
        let user_me = await friendModel.findOne({user : req.id});
        let user_friend = await friendModel.findOne({user : id});
        // user not found 
        if(!user_me || !user_friend)
        {
            return res.json({
                message : "User not found!!",
                flag_var : false
            });
        }

        // both user ar valid
        // delete friend id from my receved request array
        await friendModel.findByIdAndUpdate(user_me._id,{
            $pull : {
                receveRequest : req.params.id
            }
        });
        // delete my id from friend's send request array 
        await friendModel.findByIdAndUpdate(user_friend._id,{
            $pull : {
                sendRequest : req.id
            }
        });

        // push user id each other allfriend array
        await friendModel.findByIdAndUpdate(user_me._id,{
            $push :{
                allfriend : user_friend.user
            }
        });
        await friendModel.findByIdAndUpdate(user_friend._id,{
            $push :{
                allfriend : user_me.user
            }
        });
        return res.json({
            message : "Friend Request Accepted",
            flag_var : true
        });
    }catch(err){
        console.log(err);
        return res.json({
            message : "Internal server problrm!!",
            flag_var : false
        });
    }
}

module.exports.remove_friend = async (req,res)=>{
    let id = req.params.id;
    // console.log(id);
    try{
        // let me = await userModel.findById({user : req.id});
        // let friend = await userModel.findById({_id : id});
        // login user's id remove to friend list from which user you want to remove
        let u1 = await friendModel.findOneAndUpdate({user : id},{
            $pull : {
                allfriend : req.id
            }
        });

        // console.log(u1);

        // user's(which user you want to remove) id delete from login user's friend list
        let u2 = await friendModel.findOneAndUpdate({user : req.id},{
            $pull : {
                allfriend : id
            }
        });

        // console.log(u2);

        if(u1 && u2)
        {
            return res.json({
                message : "Remove Done from your friend list",
                flag_var : true
            });
        }
        else{
            return res.json({
                message : "user not found !!! please try again",
                flag_var : false
            });
        }
    }catch(err){
        console.log(err);
        return res.json({
            message : "Internal server error",
            flag_var : false
        })
    }
}