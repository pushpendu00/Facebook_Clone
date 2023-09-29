const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const port = 4400;
const app = express();

app.set("layout extractStyles",true);

// for use .env file data
dotenv.config();

// use for accessing url data
app.use(bodyParser.urlencoded({extended : true}));

// use cookie
app.use(cookieParser());

// set views file for direct accessing
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static("./assets"));

app.use('/',require('./routes/index'));

// store avatar from this folder set
app.use('/uploads',express.static(__dirname + '/uploads'));

// creating our own server
app.listen(port,(err)=>{
    if(err){
        console.log("Server creating problem : ",err);
    }
    console.log(`Server is rinning on port : ${port}`);
});