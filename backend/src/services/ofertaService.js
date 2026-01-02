const prisma = require('../lib/prisma');

class OfertaService {
  async criar(data, autorId) {
    const { titulo, descricao, categoriaId, propriedades } = data;
    const propriedadesString = propriedades ? JSON.stringify(propriedades) : null;

    return await prisma.oferta.create({
      data: {
        titulo,
        descricao,
        categoriaId: Number(categoriaId),
        autorUsuarioId: autorId,
        propriedades: propriedadesString,
      }
    });
  }

  async listar(categoriaId) {
    const where = categoriaId ? { categoriaId: Number(categoriaId) } : {};
    const ofertas = await prisma.oferta.findMany({
      where,
      include: {
        autor: { select: { nome: true } },
        categoria: { select: { nome: true } }
      }
    });

    return ofertas.map(o => ({
      ...o,
      propriedades: o.propriedades ? JSON.parse(o.propriedades) : {}
    }));
  }
}

module.exports = new OfertaService();