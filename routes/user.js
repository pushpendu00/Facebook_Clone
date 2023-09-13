const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const auth = require('../middlewere/auth');

router.get('/',userController.user);

router.use('/profile',auth,require('./profile'));

// router.use('/about',require('./about'));

router.use('/create-post',auth,require('./post'));

router.use('/add-comment',auth,require('./comment'));

router.use('/friends',auth,require('./friends'));

// router.use('/user/delete-post',auth,require('./post'));



// router.use('/login',require('./login'));

// router.use('/signup',require('./signup'));





module.exports = router;