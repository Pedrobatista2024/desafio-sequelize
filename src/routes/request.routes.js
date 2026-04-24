const express = require('express');
const router = express.Router();
// Importando o controller de pedidos
const requestController = require('../controllers/request.controller');

// Rota para criar um novo pedido
// URL final: http://localhost:3000/requests
router.post('/requests', requestController.criarpedido);

module.exports = router;