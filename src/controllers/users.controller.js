const users = require('../models/users');

const criarusers = async (req, res) => {
    try {
        const { name, login, password } = req.body;

        const novousers = await users.create({
            name: name,
            login: login,
            password: password
        });

        
        const resultado = novousers.toJSON();
        delete resultado.password;
        delete resultado.createdAt;
        delete resultado.updatedAt;

        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao criar usuário no sistema." });
    }
};

const listarusers = async (req, res) => {
    try {
        const todosUsuarios = await users.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }); 
        return res.status(200).json(todosUsuarios);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar todos os usuários." });
    }
};

const listarumuser = async (req, res) => {
    try {
        const usuarioEncontrado = await users.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        return res.status(200).json(usuarioEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
    }
};

const editarusers = async (req, res) => {
    try {
        const [linhasAfetadas] = await users.update(
            {
                name: req.body.name,
                login: req.body.login,
                password: req.body.password
            },
            {
                where: { id: req.params.id }
            }
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado para edição." });
        }

        return res.status(200).json({ 
            mensagem: "Usuário atualizado com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao tentar editar o usuário." });
    }
};

const deletarusers = async (req, res) => {
    try {
        const resultado = await users.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado para exclusão." });
        }

        return res.status(200).json({ 
            mensagem: "Usuário excluído com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao tentar excluir o usuário." });
    }
};

module.exports = { criarusers, listarusers, listarumuser, editarusers, deletarusers };