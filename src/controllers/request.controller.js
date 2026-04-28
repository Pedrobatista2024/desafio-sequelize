// Importando os modelos corretamente do arquivo de associações
const { request, products } = require('../models/associations'); 

const criarpedido = async (req, res) => {
    try {
        // Capturando os dados do corpo da requisição
        const { id_users, id_products, quantity } = req.body;

        // 1. Buscar o produto para checar se ele existe e verificar o estoque
        const produto = await products.findByPk(id_products);

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado!" });
        }

        // 2. Regra de Negócio: Validar estoque
        if (produto.stock < quantity) {
            return res.status(400).json({ 
                mensagem: `Estoque insuficiente! Temos apenas ${produto.stock} unidades.` 
            });
        }

        // 3. Criar o registro do Pedido no banco
        const novoPedido = await request.create({
            id_users,
            id_products,
            quantity
        });

        // 4. Regra de Negócio: Atualizar o estoque do produto
        const novoEstoque = produto.stock - quantity;
        await produto.update({ stock: novoEstoque });

        // --- ADAPTAÇÃO PARA EXIBIÇÃO DOS DADOS ---
        // Convertemos para JSON e removemos o que não deve ser exibido
        const pedidoExibicao = novoPedido.toJSON();
        delete pedidoExibicao.createdAt;
        delete pedidoExibicao.updatedAt;

        // Retornar sucesso com os dados limpos
        return res.status(201).json({
            mensagem: "Pedido realizado com sucesso!",
            pedido: pedidoExibicao,
            estoque_atualizado: novoEstoque
        });

    } catch (error) {
        // Tratamento de erro profissional: esconde o error.message técnico
        return res.status(500).json({ mensagem: "Ocorreu um erro interno ao processar o seu pedido." });
    }
};

module.exports = { criarpedido };