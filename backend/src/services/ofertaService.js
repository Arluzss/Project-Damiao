const prisma = require('../lib/prisma');

async function list(req, res) {
  try {
    const ofertas = await OfertaService.getAllOffers();
    res.json(ofertas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar ofertas' });
  }
}

async function getById(req, res) {
  try {
    const oferta = await OfertaService.getOfferById(req.params.id);
    if (!oferta) return res.status(404).json({ error: 'Oferta não encontrada' });
    res.json(oferta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar oferta' });
  }
}

async function create(req, res) {
  try {
    const payload = req.body;
    const created = await OfertaService.createOffer(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    // validar erros de negócio retornam 400 com a mensagem
    if (err && err.message) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Erro ao criar oferta' });
  }
}

async function update(req, res) {
  try {
    const updated = await OfertaService.updateOffer(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar oferta' });
  }
}

async function remove(req, res) {
  try {
    await OfertaService.deleteOffer(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar oferta' });
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};