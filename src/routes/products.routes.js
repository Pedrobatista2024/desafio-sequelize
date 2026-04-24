
const express = require('express');
const router = express.Router();
const productscontroller = require('../controllers/products.controller');

router.post('/products', productscontroller.criarproducts);
router.get('/products', productscontroller.listarproducts);
router.get('/products/:id', productscontroller.listarumproduct);
router.put('/products/:id', productscontroller.editarproducts);
router.delete('/products/:id', productscontroller.deletarproducts);

module.exports = router;