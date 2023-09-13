const express = require('express');
const router = express.Router();

router.get('/',require('../controllers/about_controller').about);


module.exports = router;