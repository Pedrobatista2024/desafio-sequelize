// Importando os modelos corretamente do arquivo de associações
const { request, products } = require('../models/associations'); 

const criarpedido = async (req, res) => {
    try {
        // Capturando os dados do corpo da requisição (JSON do Insomnia)
        const { id_users, id_products, quantity } = req.body;

        // 1. Buscar o produto para checar se ele existe e verificar o estoque
        const produto = await products.findByPk(id_products);

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado!" });
        }

        // 2. Regra de Negócio: Validar se a quantidade pedida é maior que o estoque
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

        // 4. Regra de Negócio: Atualizar o estoque do produto (Subtração)
        const novoEstoque = produto.stock - quantity;
        await produto.update({ stock: novoEstoque });

        // Retornar sucesso com os dados do pedido e o estoque novo
        return res.status(201).json({
            mensagem: "Pedido realizado com sucesso!",
            pedido: novoPedido,
            estoque_atualizado: novoEstoque
        });

    } catch (error) {
        // Captura qualquer erro de conexão ou de lógica
        return res.status(500).json({ mensagem: "Erro ao processar pedido: " + error.message });
    }
};

module.exports = { criarpedido };