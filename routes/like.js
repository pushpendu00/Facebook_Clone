const express = require('express');
const router = express.Router();
const auth = require('../middlewere/auth');


router.post('/:id',auth,require('../controllers/like_controller').like);

module.exports = router;