const lojaService = require ('../services/lojaServices');

class lojaController {
    async redeem (req, res) {
        try{
            const{ itemId } = req.body;
            const usuarioId = req.user.id;

            if (!itemId) {
                return res.status (400).json({error: 'O ID é obrigatório.'});
            }

            const resultado = await lojaService.redeemItem(usuarioId, itemId);
            return res.status(201).json(resultado);
        }
        catch (error) {
            const status = error.message.includes('insuficiente') || error.message.includes('não encontrado')

            ? 400
            : 500;

            return res.status(status).json({error: error.message});
        };
    };
};

module.exports = new lojaController();