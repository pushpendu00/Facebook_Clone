const textArea = document.querySelector('#post-text-area form textarea');
// console.log(textArea);
const post_button = document.querySelector('#post-text-area form button');

textArea.addEventListener('keyup',()=>{
    // console.log(textArea.value);
    if(textArea.value == ""){
        post_button.disabled = true;
        post_button.style.opacity = 0.3;
        post_button.style.cursor = 'not-allowed';
    }else{
        post_button.disabled = false; 
        post_button.style.opacity = 1; 
        post_button.style.cursor = 'pointer'
    }
})

// clicking show file input portion
function show_input_upload_div(){
    const file_input_label = document.getElementById('file-input');
    // console.log("show file input div");
    file_input_label.style.display = 'block';
    document.getElementById('show-upload-photo').style.display = 'none';
    document.getElementById('file-input-label').style.display = "block";
    // document.getElementById('file-input-label').style.display = 'block'
    // document.getElementById('file-input-label').style.display = 'block'
}
// clicking hide file input portion
document.getElementById('remove-upload-photo-xmark').addEventListener('click',()=>{
    document.getElementById('image-file-input').value = "";
    // console.log('value = ',document.getElementById('image-file-input').value);
    check_file_upload();
    document.getElementById('file-input').style.display = 'none';
});


// check file upload or not onchange operation
function check_file_upload(){
    const file_name = document.getElementById('image-file-input');
    if(file_name.value == ""){
        document.getElementById('show-upload-photo').style.display = "none";
        post_button.disabled = true;
        post_button.style.opacity = 0.3;
        post_button.style.cursor = 'not-allowed';
    }else{
        document.getElementById('show-upload-photo').style.display = "block";
        document.getElementById('file-input-label').style.display = 'none';

        document.querySelector('#show-upload-photo img').src = URL.createObjectURL(file_name.files[0]);
        post_button.disabled = false; 
        post_button.style.opacity = 1; 
        post_button.style.cursor = 'pointer';
    }
}