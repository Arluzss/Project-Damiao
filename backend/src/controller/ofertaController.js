const ofertaService = require('../services/ofertaService');

class OfertaController {
  async list(req, res) {
    try {
      const { tipo, categoriaId } = req.query;
      const filtros = {};
      if (tipo) filtros.tipo = tipo;
      if (categoriaId) filtros.categoriaId = parseInt(categoriaId);

      const ofertas = await ofertaService.getAllOffers(filtros);
      return res.json(ofertas);
    } catch (error) {
      console.error('Erro ao listar ofertas:', error);
      return res.status(500).json({ error: 'Erro ao buscar ofertas.' });
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const oferta = await ofertaService.getOfferById(id);
      if (!oferta) return res.status(404).json({ error: 'Oferta não encontrada.' });
      return res.json(oferta);
    } catch (error) {
      console.error('Erro ao buscar oferta:', error);
      return res.status(500).json({ error: 'Erro ao buscar oferta.' });
    }
  }

  async create(req, res) {
    try {
      const payload = req.body || {};
      const autorUsuarioId = req.user && req.user.id;
      if (!autorUsuarioId) return res.status(401).json({ error: 'Usuário não autenticado.' });

      const created = await ofertaService.createOffer({ ...payload, autorUsuarioId });
      return res.status(201).json(created);
    } catch (error) {
      console.error('Erro ao criar oferta:', error);
      const status = error.message && error.message.includes('obrigat') ? 400 : 500;
      return res.status(status).json({ error: error.message || 'Erro ao criar oferta.' });
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const autorUsuarioId = req.user && req.user.id;
      const updated = await ofertaService.updateOffer(id, req.body || {}, autorUsuarioId);
      return res.json(updated);
    } catch (error) {
      console.error('Erro ao atualizar oferta:', error);
      const status = error.message && (error.message.includes('não encontrada') || error.message.includes('Não autorizado')) ? 404 : 500;
      return res.status(status).json({ error: error.message || 'Erro ao atualizar oferta.' });
    }
  }

  async remove(req, res) {
    try {
      const id = parseInt(req.params.id);
      const autorUsuarioId = req.user && req.user.id;
      await ofertaService.deleteOffer(id, autorUsuarioId);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar oferta:', error);
      const status = error.message && error.message.includes('não encontrada') ? 404 : 500;
      return res.status(status).json({ error: error.message || 'Erro ao deletar oferta.' });
    }
  }
}

module.exports = new OfertaController();