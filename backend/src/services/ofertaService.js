const prisma = require('../lib/prisma');

class OfertaService {
  async getAllOffers(filters = {}) {
    const where = {};
    if (filters.categoriaId) where.categoriaId = Number(filters.categoriaId);

    const ofertas = await prisma.oferta.findMany({
      where,
      include: { autor: { select: { id: true, nome: true } }, categoria: true },
      orderBy: { createdAt: 'desc' }
    });

    return ofertas;
  }

  async getOfferById(id) {
    return await prisma.oferta.findUnique({
      where: { id: Number(id) },
      include: { autor: { select: { id: true, nome: true } }, categoria: true }
    });
  }

  async createOffer(payload) {
    const { titulo, categoriaId, autorUsuarioId, descricao, propriedades } = payload;
    if (!titulo || !categoriaId || !autorUsuarioId) throw new Error('Campos obrigatórios ausentes');

    const data = {
      titulo,
      descricao: descricao || null,
      categoriaId: Number(categoriaId),
      autorUsuarioId: Number(autorUsuarioId),
      propriedades: propriedades ? JSON.stringify(propriedades) : null,
      ativa: true
    };

    return await prisma.oferta.create({ data });
  }

  async updateOffer(id, payload, autorUsuarioId) {
    const oferta = await prisma.oferta.findUnique({ where: { id: Number(id) } });
    if (!oferta) throw new Error('Oferta não encontrada');
    if (autorUsuarioId && oferta.autorUsuarioId !== Number(autorUsuarioId)) throw new Error('Não autorizado');

    const data = {};
    if (payload.titulo !== undefined) data.titulo = payload.titulo;
    if (payload.descricao !== undefined) data.descricao = payload.descricao;
    if (payload.propriedades !== undefined) data.propriedades = JSON.stringify(payload.propriedades);
    if (payload.ativa !== undefined) data.ativa = payload.ativa;
    if (payload.categoriaId !== undefined) data.categoriaId = Number(payload.categoriaId);

    return await prisma.oferta.update({ where: { id: Number(id) }, data });
  }

  async deleteOffer(id, autorUsuarioId) {
    const oferta = await prisma.oferta.findUnique({ where: { id: Number(id) } });
    if (!oferta) throw new Error('Oferta não encontrada');
    if (autorUsuarioId && oferta.autorUsuarioId !== Number(autorUsuarioId)) throw new Error('Não autorizado');

    await prisma.oferta.delete({ where: { id: Number(id) } });
  }
}

module.exports = new OfertaService();