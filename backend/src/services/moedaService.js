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

    async addPoints(usuarioId, motivoChave) {
        const config = this.VALORES_POR_MOTIVO[motivoChave];
        if (!config) return null;

        // anti-abuso: feedback somente 1 vez por dia
        if (motivoChave === 'feedback') {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const jaRecebeuHoje = await prisma.extratoPontos.findFirst({
                where: {
                    usuarioId,
                    motivo: config.descricao,
                    createdAt: { gte: hoje }
                }
            });

            if (jaRecebeuHoje) throw new Error('Limite diário para este motivo atingido');
        }

        const entry = await prisma.extratoPontos.create({
            data: {
                usuarioId,
                quantidade: config.valor,
                motivo: config.descricao
            }
        });

        const totals = await this.getTotalPoints(usuarioId);
        return { entry, total: totals.total };
    }
}

module.exports = new MoedaService();