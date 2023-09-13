const mongoose = require('mongoose');
var db;
connectionFun();
async function connectionFun(){
    // var url = 'mongodb://localhost:27017/socialMedia';
    var url = "mongodb://127.0.0.1:27017/socialMedia";
    db = await mongoose.connect(url,{useNewurlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("database are successfully connected..........");
    }).catch((error)=>{
        console.log(error);
    });
    // try{
    //     db = await mongoose.connect(url);
    //     console.log("database are successfully connected..........");
    // }catch(e){
    //     console.log("couldn't connected Database ");
    // }
}
// console.log('connection');



module.exports = db;