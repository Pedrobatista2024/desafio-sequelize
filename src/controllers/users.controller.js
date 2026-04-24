const users = require('../models/users');

const criarusers = async (req, res) => {
    try {
        const { name, login, password } = req.body;

        const novousers = await users.create({
            name: name,
            login: login,
            password: password
        });
        return res.status(201).json(novousers);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao criar: " + error.message });
    }
};

const listarusers = async (req, res) => {
    try {
        const todosUsuarios = await users.findAll(); 
        return res.status(200).json(todosUsuarios);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar todos: " + error.message })
    }
};

const listarumuser = async (req, res) => {
    try {
        const usuarioEncontrado = await users.findByPk(req.params.id);
        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        return res.status(200).json(usuarioEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar usuário: " + error.message });
    }
};

const editarusers = async (req, res) => {
    try {
        await users.update(
            {
                name: req.body.name,
                login: req.body.login,
                password: req.body.password
            },
            {
                where: { id: req.params.id }
            }
        );
        return res.status(200).json({ 
            mensagem: "Usuário atualizado com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao editar: " + error.message });
    }
};

const deletarusers = async (req, res) => {
    try {
        await users.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(200).json({ 
            mensagem: "Usuário excluído com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao excluir: " + error.message });
    }
};

module.exports = { criarusers, listarusers, listarumuser, editarusers, deletarusers };

