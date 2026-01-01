const moedaService = require('../services/moedaService');

class moedaController {
    async getUserPoints (req, res) {
        try {
            const usuariaId = req.user.id;
            const total = await moedaService.getTotalPoints(usuariaId);
            const extrato =await moedasService.getExtratoByUser(usuarioId);

            return res.status(200).json({total, extrato });
        } catch (error) {
            return res.status(500).json({error: 'error interno ao busccar moedas. '})
        }
    }

    async addPoints (req, res) {
        try {
            const {motivo} = req.body;
            const usuariaId = req.user.id;

            const resultado = await moedaService.addPoints(usuarioId, motivo);


        if (!resultado) {
            return res.status(400).json({ error: 'Motivo inválido ou não permitido.'});
        }
       
        return res. status(201).json(resultado);
    } catch (error) {
        const isAbuse = error.message.includes('Limite');
        return res.status(isAbuse ? 400 : 500).json({ error: error,message });
    }
  }
}

module.exports = new moedaController();