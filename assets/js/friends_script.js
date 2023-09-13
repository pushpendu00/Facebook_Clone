// console.log("hello world");

document.getElementById('head-friends-div').addEventListener('click',()=>{
    document.getElementById('friend-div').style.display = 'block';
    document.getElementById('head-friends-div').style.backgroundColor = 'rgb(156, 234, 128)';
    document.getElementById('head-request-div').classList.remove('clicking-style-add');
    document.getElementById('friend-request-div').style.display = 'none';

});

document.getElementById('head-request-div').addEventListener('click',()=>{
    document.getElementById('friend-div').style.display = 'none';
    document.getElementById('head-friends-div').style.backgroundColor = 'rgb(218, 218, 218)';
    document.getElementById('friend-request-div').style.display = 'block';
    document.getElementById('head-request-div').classList.add('clicking-style-add');

});

// add friend
async function addFriend(friendId){
    console.log("add friend");
    try{
        // console.log(friendId);
        let result = await $.ajax({
            type : 'post',
            url : `/user/friends/add/${friendId}`
        });
        // console.log(result.message);

        if(result.flag_var != true){
            alert(result.message);
        }else{
            alert(result.message);
            window.location = '/';
        }
    }catch(err){
        console.log(err);
        window.location = '/';
    }
}

// accept friend request
async function acceptFriendRequest(friendId){
    console.log(friendId);
    try{
        let result = await $.ajax({
            type : 'post',
            url : `/user/friends/confirm/${friendId}`
        });
        // console.log(result);
        if(result.flag_var != true){
            alert(result.message);
        }else{
            alert(result.message);
            window.location = '/';
        }
    }catch(err){
        console.log(err);
        window.location = '/';
    }
}

// remove any friend from your friend list
async function romoveFriend(friendId){
    try{
        // console.log(friendId);
        var result = await $.ajax({
            type : 'post',
            url : `/user/friends/remove/${friendId}`
        });
        // console.log(result);
        if(result.flag_var != true){
            alert(result.message);
        }else{
            alert(result.message);
            window.location = '/';
        }
    }catch(err){
        console.log(err);
        window.location.href = '/';
    }
}

