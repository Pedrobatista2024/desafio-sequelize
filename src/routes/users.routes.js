const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/users.controller');

router.post('/users', userscontroller.criarusers);

module.exports = router;