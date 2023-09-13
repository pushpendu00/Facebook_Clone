const express = require('express');
const router = express.Router();

router.get('/',require('../controllers/register_controller').register);




module.exports = router;