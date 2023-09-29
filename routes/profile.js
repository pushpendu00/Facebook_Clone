const express = require('express');
const auth = require('../middlewere/auth');
const router = express.Router();

// const multer = require('multer');
// const avatar_path = "../uploads/avatar";

// var upload = multer({
//     dest : avatar_path
// });

router.get('/',require('../controllers/profile_controller').profileMy);

router.get('/:userName/:id',require('../controllers/profile_controller').profileById);

router.post('/add-profile-photo',auth,require('../controllers/profile_controller').uploaded);
//     console.log("hello world");
//     res.redirect('back');
// });



module.exports = router;