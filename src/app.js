require('dotenv').config();

const express = require('express');
const usersroutes = require('./routes/users.routes');
const productsroutes = require('./routes/products.routes');
const requestroutes = require('./routes/request.routes');
const app = express();

app.use(express.json());
app.use(usersroutes);
app.use(productsroutes);
app.use(requestroutes);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});