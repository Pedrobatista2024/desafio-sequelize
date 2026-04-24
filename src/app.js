require('dotenv').config();

const express = require('express');
const usersroutes = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(usersroutes);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});