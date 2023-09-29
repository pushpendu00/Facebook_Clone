const express = require('express');
const auth = require('../middlewere/auth');
const postSchema = require('../models/postSchema');
const router = express.Router();




router.post('/create',auth,postSchema.upload_photo,require('../controllers/post_controller').create_post);
router.post('/delete/:id',auth,require('../controllers/post_controller').delete_post);


module.exports = router;