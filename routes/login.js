const express = require('express');
const router = express.Router();

router.get('/',require('../controllers/login_controller').login);

// router.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.redirect('/user');
// });
// router.post('/login',require('../controllers/login_controller').loginPost);


module.exports = router;