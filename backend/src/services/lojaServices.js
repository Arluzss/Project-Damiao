const prisma = require('../lib/prisma');
const moedasService = require('./moedaService');

class lojaService {  // É um catálogo estático que pode ser movido para o banco futuramente 

    CATALOGO = {
        'mentoria_carreira': {nome: 'Mentoria de Carreira', custo: 150},
        'ebook_empreendedor': {nome: 'E-book Empreendedorismo', custo: 50},
        'ingresso_evento': {nome: 'Ingresso Workshop', custo: 200 }
    };

    async redeeItem(usuarioId, itemId) {
        const item = this.CATALOGO[itemId];

        if(!item) throw new Error('Item não encontrado no catálogo'); // 1 validação de existencia de item 

        const saldoAtual = await moedasService.getTotalPoints(usuarioId); // 2 serve para calcular saldo atual 

        if (saldoAtual < item.custo) {
            throw new Error('Saldo insuficiente para este resgate'); // 4 É uma transação atômica. FOi utilizado  $transaction ara garantir que, se algo falhar, nada seja gravado
            
        }

        return await prisma.$transaction(async (tx) => {

            const lancamento = await tx.extratoPontos.create({ // serve para criar lançamento negativo no extrato 
                data: {
                    usuarioId,
                    quantidade: -item.custo, // será valor negativo para débito
                    motivo: `Resgate: ${item.nome}`
                }
            });

            const agregacao = await tx.extratoPontos.aggregate({ //vai calcular saldo final atualizado
                where: {usuarioId},
                _sum: {quantidade: true}
            });

            const totalAfter = agregacao._sum.quantidade || 0;

            return {
                sucess: true,
                item: item.nome,
                debited: item.custo,
                totalAfter
            };

        });

    }
}

module.exports = new lojaService();