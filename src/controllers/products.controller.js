const products = require('../models/products');

const criarproducts = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const novoproducts = await products.create({
            name: name,
            price: price,
            stock: stock
        });
        return res.status(201).json(novoproducts);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao criar: " + error.message });
    }
};

const listarproducts = async (req, res) => {
    try {
        const todosProducts = await products.findAll(); 
        return res.status(200).json(todosProducts);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar todos: " + error.message })
    }
};

const listarumproduct = async (req, res) => {
    try {
        const productEncontrado = await products.findByPk(req.params.id);
        if (!productEncontrado) {
            return res.status(404).json({ mensagem: "produto não encontrado" });
        }
        return res.status(200).json(productEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar produto: " + error.message });
    }
};

const editarproducts = async (req, res) => {
    try {
        await products.update(
            {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            },
            {
                where: { id: req.params.id }
            }
        );
        return res.status(200).json({ 
            mensagem: "produto atualizado com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao editar: " + error.message });
    }
};

const deletarproducts = async (req, res) => {
    try {
        await products.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(200).json({ 
            mensagem: "produto excluído com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao excluir: " + error.message });
    }
};

module.exports = { criarproducts, listarproducts, listarumproduct, editarproducts, deletarproducts };

