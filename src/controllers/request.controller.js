
const { request, products, users } = require('../models/associations'); 

const criarpedido = async (req, res) => {
    try {
        const { id_users, id_products, quantity } = req.body;

        // 1. Validação de Usuário: Checar se o usuário existe
        const usuario = await users.findByPk(id_users);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado! Não é possível realizar o pedido." });
        }

        // 2. Validação de Produto: Checar se o produto existe
        const produto = await products.findByPk(id_products);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado!" });
        }

        // 3. Regra de Negócio: Validar estoque
        if (produto.stock < quantity) {
            return res.status(400).json({ 
                mensagem: `Estoque insuficiente! Temos apenas ${produto.stock} unidades.` 
            });
        }

        // 4. Criar o registro do Pedido
        const novoPedido = await request.create({
            id_users,
            id_products,
            quantity
        });

        // 5. Atualizar o estoque do produto
        const novoEstoque = produto.stock - quantity;
        await produto.update({ stock: novoEstoque });

        // Limpeza dos dados para exibição
        const pedidoExibicao = novoPedido.toJSON();
        delete pedidoExibicao.createdAt;
        delete pedidoExibicao.updatedAt;

        return res.status(201).json({
            mensagem: "Pedido realizado com sucesso!",
            pedido: pedidoExibicao,
            estoque_atualizado: novoEstoque
        });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno ao processar o pedido." });
    }
};

module.exports = { criarpedido };