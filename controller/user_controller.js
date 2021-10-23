const express = require('express');
const router = express.Router();
const {user_login, user_logout, user_register} = require("../service/user_service");

router.post('/login', user_login);
router.post('/register', user_register);

module.exports = router