const prisma = require('../lib/prisma');

class FeedbackService {
  async getByConexao(conexaoId) {
    return await prisma.feedback.findMany({
      where: { conexaoId: Number(conexaoId) },
      include: {
        avaliador: { select: { id: true, nome: true } },
        avaliado: { select: { id: true, nome: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getByAvaliado(avaliadoUsuarioId) {
    return await prisma.feedback.findMany({
      where: { avaliadoUsuarioId: Number(avaliadoUsuarioId) },
      include: {
        avaliador: { select: { id: true, nome: true } },
        conexao: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createFeedback(payload) {
    const { conexaoId, avaliadorUsuarioId, avaliadoUsuarioId, nota, comentario } = payload || {};
    if (!conexaoId || !avaliadorUsuarioId || !avaliadoUsuarioId || nota === undefined) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const data = {
      conexaoId: Number(conexaoId),
      avaliadorUsuarioId: Number(avaliadorUsuarioId),
      avaliadoUsuarioId: Number(avaliadoUsuarioId),
      nota: Number(nota),
      comentario: comentario || null
    };

    return await prisma.feedback.create({ data });
  }
}

module.exports = new FeedbackService();
