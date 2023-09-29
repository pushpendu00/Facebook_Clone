const express = require('express');
const auth = require('../middlewere/auth');
const router = express.Router();

router.post('/',require('../controllers/comment_controller').comment);

router.get('/delete-comment/:id',auth,require('../controllers/comment_controller').delete_coment);

module.exports = router;