const feedbackService = require('../services/feedbackService');

class FeedbackController {
  async listByConexao(req, res) {
    try {
      const conexaoId = parseInt(req.params.conexaoId);
      const feedbacks = await feedbackService.getByConexao(conexaoId);
      return res.json(feedbacks);
    } catch (error) {
      console.error('Erro ao listar feedbacks por conexão:', error);
      return res.status(500).json({ error: 'Erro ao buscar feedbacks.' });
    }
  }

  async listByAvaliado(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const feedbacks = await feedbackService.getByAvaliado(usuarioId);
      return res.json(feedbacks);
    } catch (error) {
      console.error('Erro ao listar feedbacks por usuário:', error);
      return res.status(500).json({ error: 'Erro ao buscar feedbacks.' });
    }
  }

  async create(req, res) {
    try {
      const avaliadorUsuarioId = req.user && req.user.id;
      if (!avaliadorUsuarioId) return res.status(401).json({ error: 'Usuário não autenticado.' });

      const { conexaoId, avaliadoUsuarioId, nota, comentario } = req.body || {};
      const created = await feedbackService.createFeedback({
        conexaoId,
        avaliadorUsuarioId,
        avaliadoUsuarioId,
        nota,
        comentario
      });

      return res.status(201).json(created);
    } catch (error) {
      console.error('Erro ao criar feedback:', error);
      const status = error.message && error.message.includes('obrigat') ? 400 : 500;
      return res.status(status).json({ error: error.message || 'Erro ao criar feedback.' });
    }
  }
}

module.exports = new FeedbackController();
