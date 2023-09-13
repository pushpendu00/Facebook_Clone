const express = require('express');
const auth = require('../middlewere/auth');
const router = express.Router();

// send friend request
router.post('/add/:id',auth,require('../controllers/friendship_controller').add_Friend);

// accept friend request
router.post('/confirm/:id',auth,require('../controllers/friendship_controller').accept_request);

// delete Friend
router.post('/remove/:id',auth,require('../controllers/friendship_controller').remove_friend);


module.exports = router;