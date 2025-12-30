const authService = require('../services/authService');

class AuthController { 
    /*
    getAll(req, res) {
    retornar todos os feedback
        // Implementar se necessário
    }
    */
    async register(req, res) {
        try {
            const { nome, documento_fiscal, tipo_pessoa, senha, email } = req.body;

            const usuarioCriado = await authService.register({
                nome,
                documento_fiscal,
                tipo_pessoa,
                senha,
                email
            });

            return res.status(201).json(usuarioCriado);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { documento_fiscal, senha } = req.body;

            if (!documento_fiscal || !senha) {
                return res.status(400).json({ error: 'Informe email ou documento e senha' });
            }

            const resultado = await authService.login(documento_fiscal, senha);

            return res.status(200).json(resultado);

        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();