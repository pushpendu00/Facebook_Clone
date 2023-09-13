const express = require('express');
const auth = require('../middlewere/auth');
const router = express.Router();




router.post('/',auth,require('../controllers/post_controller').post);
router.get('/delete-post/:id',auth,require('../controllers/post_controller').delete_post);


module.exports = router;