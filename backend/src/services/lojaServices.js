const prisma = require('../lib/prisma');
const moedasService = require('./moedaService');

class lojaService {  // É um catálogo estático que pode ser movido para o banco futuramente 

    CATALOGO = {
        // Prêmios/Brindes
        'vale_amazon_50': {nome: 'Vale-Presente Amazon R$ 50', custo: 500},
        'fone_bluetooth': {nome: 'Fone de Ouvido Bluetooth', custo: 800},
        'mochila_executiva': {nome: 'Mochila Executiva', custo: 600},
        
        // Descontos
        'desconto_livraria': {nome: 'Desconto Livraria Cultura - 20%', custo: 200},
        'desconto_ifood': {nome: 'Desconto iFood - R$ 25', custo: 250},
        'desconto_academia': {nome: 'Academia FitLife - 1 mês grátis', custo: 400},
        
        // Mentorias
        'mentoria_carreira': {nome: 'Mentoria de Carreira em Tecnologia', custo: 300},
        'mentoria_empreendedorismo': {nome: 'Mentoria Empreendedorismo Digital', custo: 350},
        'mentoria_marketing': {nome: 'Mentoria Marketing e Vendas', custo: 300},
        
        // Legados (manter compatibilidade)
        'ebook_empreendedor': {nome: 'E-book Empreendedorismo', custo: 50},
        'ingresso_evento': {nome: 'Ingresso Workshop', custo: 200}
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