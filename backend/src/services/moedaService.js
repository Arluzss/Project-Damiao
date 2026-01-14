const prisma = require('../lib/prisma');

class MoedaService {
    constructor() {
        this.VALORES_POR_MOTIVO = {
            feedback: { valor: 25, descricao: 'Feedback enviado' },
            cadastro_completo: { valor: 50, descricao: 'Perfil completado' },
            teste_personalidade: { valor: 50, descricao: 'Teste de Personalidade concluído' }
        };
    }

    async getTotalPoints(usuarioId) {
        const agregacao = await prisma.extratoPontos.aggregate({
            where: { usuarioId },
            _sum: { quantidade: true }
        });

        const total = (agregacao && agregacao._sum && agregacao._sum.quantidade) || 0;

        const extrato = await prisma.extratoPontos.findMany({
            where: { usuarioId },
            orderBy: { createdAt: 'desc' }
        });

        return { total, extrato };
    }

    async addPoints(usuarioId, motivoChave, detalhes = {}) {
        const config = this.VALORES_POR_MOTIVO[motivoChave];
        if (!config) return null;

        // anti-abuso: feedback por curso (uma vez por curso)
        if (motivoChave === 'feedback') {
            const cursoId = detalhes.cursoId;
            if (!cursoId) {
                throw new Error('cursoId é obrigatório para feedback');
            }

            const motivoCompleto = `${config.descricao} - Curso ${cursoId}`;
            const jaRecebeu = await prisma.extratoPontos.findFirst({
                where: {
                    usuarioId,
                    motivo: motivoCompleto
                }
            });

            if (jaRecebeu) {
                throw new Error(`Você já recebeu pontos por avaliar este curso`);
            }
        }

        // anti-abuso: teste_personalidade somente 1 vez (NUNCA mais)
        if (motivoChave === 'teste_personalidade') {
            const jaRecebeu = await prisma.extratoPontos.findFirst({
                where: {
                    usuarioId,
                    motivo: config.descricao
                }
            });

            if (jaRecebeu) {
                throw new Error(`Você já recebeu pontos por teste de personalidade anteriormente`);
            }
        }

        // Adicionar curso ao motivo se for feedback
        let motivoFinal = config.descricao;
        if (motivoChave === 'feedback' && detalhes.cursoId) {
            motivoFinal = `${config.descricao} - Curso ${detalhes.cursoId}`;
        }

        const entry = await prisma.extratoPontos.create({
            data: {
                usuarioId,
                quantidade: config.valor,
                motivo: motivoFinal
            }
        });

        const totals = await this.getTotalPoints(usuarioId);
        return { entry, total: totals.total };
    }
}

module.exports = new MoedaService();