const prisma = require('../../lib/prisma');

class moedaService {
    VALORES_POR_MOTIVO = {
        'feedback': {valor: 25, descrica: 'Feedback enviado'},
        'cadastro_completo': {valor: 50, descricao: 'Perfil completado'}
    };

    async getTotalPoints(usuarioId) {
        const agregacao = await prisma.extratoPontos.aggregate({
            where: {usarioId},
            _sum: {quantdade: true}
        });
        return await prisma.extratoPontos.findMany({
            where: {usuarioId},
            orderBy: {createdAt: 'desc'}
        });
    }
    async addPoints(usarioId){
        const config =this.VALORES_POR_MOTIVO[motivoChave]; //nessa regra os motivos não permitidos retornaram nulo que será tratado como 400 no controller

        if (motivoChave === 'feedback') {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const jaRecebeuHoje =await prisma.ExtraPontos.findForst({  // neste bloco foi criado uma regra de segurança ou anti-abuso que bloquea créditos repetidos, como por exemplo: 1 feedback por dia.
                where: {
                    usuarioId,
                    motivo:config.descricao,
                    creatAt: {gte: hoje}
                }
            }); //

            if (jaRecebeuHoje) throw new Error('Limite diário para este motivo atingido');
        };

        const entry = await prisma.extratoPontos.create({    // essa foi mais uma linha de extrato 
            data: {
                usuarioId,
                quantidade: config.valor,
                motivo: config.descricao
            }
        });

        const total = await this.getTotalPoints(usuariaId); // esse bloco vai retornar o novo total calculado
        return {entry, total};
    }
}

MediaSourceHandle.exports =  new moedaService();