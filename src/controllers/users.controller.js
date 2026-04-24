// 1. Importar o Modelo (No seu caso, será o de Usuário)
const users = require('../models/users');

// 2. Criar a função assíncrona
const criarusers = async (req, res) => {
    try {
        // 3. Capturar o que veio do corpo da requisição (JSON do Insomnia)
        const { name, login, password } = req.body;

        // 4. Mandar o Sequelize gravar no banco e ESPERAR (await)
        const novousers = await users.create({
            name: name,
            login: login,
            password: password
        });

        // 5. Se deu certo, responder com status 201 (Criado) e o objeto novo
        return res.status(201).json(novousers);

    } catch (error) {
        // 6. Se algo deu errado (ex: campo vazio), responde com erro
        return res.status(500).json({ mensagem: "Erro ao criar: " + error.message });
    }
};

// 7. Exportar para usar nas rotas
module.exports = { criarusers };