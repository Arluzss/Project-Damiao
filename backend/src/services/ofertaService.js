const prisma = require('../lib/prisma');

class OfertaService {
  async getAllOffers(filters = {}) {
    const where = {};
    if (filters.categoriaId) where.categoriaId = Number(filters.categoriaId);
    if (filters.tipo) where.tipo = filters.tipo;

    const ofertas = await prisma.oferta.findMany({
      where,
      include: { autor: { select: { id: true, nome: true } }, categoria: true },
      orderBy: { createdAt: 'desc' }
    });

    return ofertas.map((o) => ({
      ...o,
      propriedades: o.propriedades ? JSON.parse(o.propriedades) : null
    }));
  }

  async getOfferById(id) {
    return await prisma.oferta.findUnique({
      where: { id: Number(id) },
      include: { autor: { select: { id: true, nome: true } }, categoria: true }
    });
  }

  async createOffer(payload) {
    const { titulo, categoriaId, autorUsuarioId, descricao, propriedades, tipo } = payload;
    if (!titulo || !categoriaId || !autorUsuarioId || !tipo) throw new Error('Campos obrigatórios ausentes');

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(autorUsuarioId) } });
    if (!usuario) throw new Error('AutorUsuario não encontrado');

    const categoria = await prisma.categoria.findUnique({ where: { id: Number(categoriaId) } });
    if (!categoria) throw new Error('Categoria não encontrada');

    const data = {
      titulo,
      descricao: descricao || null,
      categoriaId: Number(categoriaId),
      autorUsuarioId: Number(autorUsuarioId),
      propriedades: propriedades ? JSON.stringify(propriedades) : null,
      ativa: true,
      tipo
    };

    const created = await prisma.oferta.create({ data });
    return { ...created, propriedades: created.propriedades ? JSON.parse(created.propriedades) : null };
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
    if (payload.tipo !== undefined) data.tipo = payload.tipo;

    const updated = await prisma.oferta.update({ where: { id: Number(id) }, data });
    return { ...updated, propriedades: updated.propriedades ? JSON.parse(updated.propriedades) : null };
  }

  async deleteOffer(id, autorUsuarioId) {
    const oferta = await prisma.oferta.findUnique({ where: { id: Number(id) } });
    if (!oferta) throw new Error('Oferta não encontrada');
    if (autorUsuarioId && oferta.autorUsuarioId !== Number(autorUsuarioId)) throw new Error('Não autorizado');

    await prisma.oferta.delete({ where: { id: Number(id) } });
  }
}

module.exports = new OfertaService();