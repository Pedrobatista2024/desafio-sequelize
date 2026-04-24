const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/users.controller');

router.post('/users', userscontroller.criarusers);
router.get('/users', userscontroller.listarusers);
router.get('/users/:id', userscontroller.listarumuser);
router.put('/users/:id', userscontroller.editarusers);
router.delete('/users/:id', userscontroller.deletarusers);

module.exports = router;