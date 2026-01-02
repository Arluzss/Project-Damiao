const ofertasService = require('../services/ofertasService');

class OfferController {
  async create(req, res) {
    try {
      const { titulo, categoriaId } = req.body;

      if (!titulo || !categoriaId) {
        return res.status(400).json({ error: "Título e Categoria são obrigatórios." });
      }

      // O autor vem do middleware de autenticação
      const autorId = req.user.id; 

      const oferta = await ofertasService.criar(req.body, autorId);
      return res.status(201).json(oferta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar oferta." });
    }
  }

  async index(req, res) {
    try {
      const { categoriaId } = req.query;
      const ofertas = await ofertasService.listar(categoriaId);
      return res.json(ofertas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar ofertas." });
    }
  }

  async show(req, res) {
    try {
      const oferta = await ofertasService.buscarPorId(req.params.id);
      if (!oferta) return res.status(404).json({ error: "Oferta não encontrada." });
      return res.json(oferta);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar detalhes." });
    }
  }
}

module.exports = new OfferController();