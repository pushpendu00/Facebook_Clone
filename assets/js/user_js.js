
// console.log("hello");
let profile_flag = 0;
const profile = document.getElementById("your-profile");
const profile_content = document.getElementById('profile-div');
profile.addEventListener('click',()=>{
    if(profile_flag == 0 ){
        profile_content.style.display = "block";
        // document.getElementById('main').style.position = "relative";
        profile_flag = 1;
    }else{
        profile_content.style.display = "none";
        // document.getElementById('main').style.position = "absolute";
        profile_flag = 0;
    }
    // console.log(profile_flag);
});

// profile-div-cross
document.getElementById('profile-div-cross').addEventListener('click',()=>{
    profile_content.style.display = "none";
    profile_flag = 0;
});



// Show and Hide clicking show post three dot
function showThreeDotContent(postId){
    if(document.getElementById(`delete-post-ellipsis-content-${postId}`).style.display == 'block'){
        document.getElementById(`delete-post-ellipsis-content-${postId}`).style.display = 'none';
    }else{
        document.getElementById(`delete-post-ellipsis-content-${postId}`).style.display = 'block';
    }
}
// Hide clicking show post three dot
function hideThreeDotContent(postId){
    document.getElementById(`delete-post-ellipsis-content-${postId}`).style.display = 'none';
}

/**Delete post */

async function deletePost(post_id){
    console.log(post_id);
    let result = await $.ajax({
        type : 'post',
        url : `user/post/delete/${post_id}`
    });
    if(result.status ==1){
        document.getElementById(`post-${post_id}`).remove();
    }
    // console.log(result);
}




/**LOG OUT */
async function logOut(){
    try{
        // console.log("hello");
        let result = await $.ajax({
            type : 'post',
            url : '/log-out'
        });
        window.location = '/';
    }catch(err){
        console.log(err);
    }
}


// clicking open post page
const create_post_onclick = document.getElementById("create-post-onclick");
const create_post_page = document.getElementById("create-post-page");
const close_create_post = document.getElementById('close-create-post');

create_post_onclick.addEventListener('click',()=>{
    create_post_page.style.display = 'block';
    document.getElementById("display").style.display = "none";
});

close_create_post.addEventListener('click',()=>{
    if(document.getElementById('image-file-input').value != "" 
        || 
        document.querySelector('#post-text-area form textarea').value != ""){
            let con = confirm("Will you cancle this post ?");
            if(con == false)
            {
                console.log("confirn false")
                return;
            }
        }
        // remove all text and file
        document.querySelector('#post-text-area form textarea').value = "";
        document.getElementById('image-file-input').value = "";
        document.querySelector('#show-upload-photo img').src = "";
        create_post_page.style.display = 'none';
        document.getElementById('file-input-label').style.display = "block";
        document.getElementById("display").style.display = "block";
        document.getElementById('show-upload-photo').style.display = 'none';
});
document.getElementById("upload-photo-video").addEventListener('click',()=>{
    document.getElementById("display").style.display = "none";
    create_post_page.style.display = 'block';
    document.getElementById('file-input').style.display = 'block';
});


// click like 
async function clickLike(post_id){
    // console.log(post_id);
    let result = await $.ajax({
        type : 'post',
        url : `/user/post-like/${post_id}`
    });
    // console.log(result);
    if(result.message =='done'){
        // console.log(result.total_like);
        let like_dom = document.getElementById(`${result.id_post}`);
        let like_div = document.getElementById(`like-count-div-${result.id_post}`);
        let like_count_first = document.getElementById(`like-count-first-${result.id_post}`);
        if(result.like_status == 0){
            like_dom.style.color = '#262626'; 
            if(result.total_like==1){
                like_count_first.innerHTML = "";
            }
            else{
                like_div.innerHTML = `${result.total_like-1}`;
            }
        }else{
            like_dom.style.color = '#0e61ef';
            // console.log("first like = ",result.total_like);
            if(result.total_like==0){
                like_count_first.innerHTML = `
                &emsp;<i class="fa-regular fa-thumbs-up fa-sm" style="color: #0e61ef;"></i>
                <span class="like-count" id="like-count-div-<%= post.user._id %>-<%= post._id%>">
                    You
                </span>
                `;
            }else{
                like_div.innerHTML = `You and ${result.total_like} others`;
            }  
        }
    }
}
