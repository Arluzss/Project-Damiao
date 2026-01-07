const service = require('../services/lojaServices');

exports.redeem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const usuarioId = req.user && req.user.id; // vem do authMiddleware

        if (!usuarioId) {
            return res.status(400).json({ error: 'Usuário não autenticado' });
        }

        if (!itemId) {
            return res.status(400).json({ error: 'itemId é obrigatório' });
        }

        const result = await service.redeeItem(usuarioId, itemId);
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
