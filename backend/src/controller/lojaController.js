const service = require('../services/lojaServices');

exports.list = async (req, res) => {
    try {
        const items = await service.getAllItems();
        return res.json(items);
    } catch (error) {
        console.error("❌ Erro ao listar itens:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

exports.redeem = async (req, res) => {
    try {
        console.log("📦 Requisição de resgate recebida:", req.body);
        const { itemId } = req.body;
        const usuarioId = req.user && req.user.id;

        if (!usuarioId) {
            console.log("❌ Usuário não autenticado");
            return res.status(400).json({ error: 'Usuário não autenticado' });
        }

        if (!itemId) {
            console.log("❌ itemId ausente");
            return res.status(400).json({ error: 'itemId é obrigatório' });
        }

        console.log(`🛒 Processando resgate: usuarioId=${usuarioId}, itemId=${itemId}`);
        const result = await service.redeeItem(usuarioId, itemId);
        console.log("✅ Resgate bem-sucedido:", result);
        return res.json(result);
    } catch (error) {
        console.error("❌ Erro no resgate:", error.message);
        return res.status(400).json({ error: error.message });
    }
};
