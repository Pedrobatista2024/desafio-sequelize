const products = require('../models/products');

const criarproducts = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const novoproducts = await products.create({
            name: name,
            price: price,
            stock: stock
        });

        
        const resultado = novoproducts.toJSON();
        delete resultado.createdAt;
        delete resultado.updatedAt;

        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar o produto." });
    }
};

const listarproducts = async (req, res) => {
    try {
        
        const todosProducts = await products.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }); 
        return res.status(200).json(todosProducts);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar os produtos." });
    }
};

const listarumproduct = async (req, res) => {
    try {
        const productEncontrado = await products.findByPk(req.params.id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!productEncontrado) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }
        return res.status(200).json(productEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar detalhes do produto." });
    }
};

const editarproducts = async (req, res) => {
    try {
        const [linhasAfetadas] = await products.update(
            {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            },
            {
                where: { id: req.params.id }
            }
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado para atualização." });
        }

        return res.status(200).json({ 
            mensagem: "Produto atualizado com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao tentar atualizar o produto." });
    }
};

const deletarproducts = async (req, res) => {
    try {
        const resultado = await products.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado para exclusão." });
        }

        return res.status(200).json({ 
            mensagem: "Produto excluído com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao tentar remover o produto." });
    }
};

module.exports = { criarproducts, listarproducts, listarumproduct, editarproducts, deletarproducts };