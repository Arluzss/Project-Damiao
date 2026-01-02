const moedaService = require('../services/moedaService');

class MoedaController {
    async getUserPoints(req, res) {
        try {
            const usuarioId = req.user && req.user.id;
            const result = await moedaService.getTotalPoints(usuarioId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao buscar moedas.' });
        }
    }

    async addPoints(req, res) {
        try {
            const { motivo } = req.body;
            const usuarioId = req.user && req.user.id;

            const resultado = await moedaService.addPoints(usuarioId, motivo);

            if (!resultado) {
                return res.status(400).json({ error: 'Motivo inválido ou não permitido.' });
            }

            return res.status(201).json(resultado);
        } catch (error) {
            const isAbuse = error.message && error.message.includes('Limite');
            return res.status(isAbuse ? 400 : 500).json({ error: error.message || 'Erro interno' });
        }
    }
}

module.exports = new MoedaController();