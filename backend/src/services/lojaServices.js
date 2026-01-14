const prisma = require('../lib/prisma');
const moedasService = require('./moedaService');

class lojaService {  // É um catálogo estático que pode ser movido para o banco futuramente 

    CATALOGO = {
        // Item de Teste (barato)
        'badge_pioneiro': {nome: 'Badge de Pioneiro', custo: 20},
        
        // Prêmios/Brindes
        'vale_amazon_50': {nome: 'Vale-Presente R$ 50', custo: 500},
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

    async getAllItems() {
        // Retorna todos os itens do catálogo com suas categorias
        return Object.keys(this.CATALOGO).map(id => ({
            id,
            name: this.CATALOGO[id].nome,
            cost: this.CATALOGO[id].custo,
            category: this.getCategoryForItem(id)
        }));
    }

    getCategoryForItem(itemId) {
        if (itemId === 'badge_pioneiro') return 'special';
        if (itemId === 'adesivo_exclusivo') return 'product';
        if (itemId.includes('vale_') || itemId.includes('fone_') || itemId.includes('mochila_')) return 'product';
        if (itemId.includes('desconto_')) return 'discount';
        if (itemId.includes('mentoria_')) return 'mentorship';
        return 'other';
    }

    async redeeItem(usuarioId, itemId) {
        const item = this.CATALOGO[itemId];

        if(!item) throw new Error('Item não encontrado no catálogo');

        // getTotalPoints retorna { total, extrato }, então precisamos acessar .total
        const { total: saldoAtual } = await moedasService.getTotalPoints(usuarioId);

        if (saldoAtual < item.custo) {
            throw new Error('Saldo insuficiente para este resgate');
        }

        return await prisma.$transaction(async (tx) => {

            const lancamento = await tx.extratoPontos.create({
                data: {
                    usuarioId,
                    quantidade: -item.custo, // valor negativo para débito
                    motivo: `Resgate: ${item.nome}`
                }
            });

            const agregacao = await tx.extratoPontos.aggregate({
                where: {usuarioId},
                _sum: {quantidade: true}
            });

            const totalAfter = agregacao._sum.quantidade || 0;

            return {
                success: true, // Corrigido de 'sucess' para 'success'
                item: item.nome,
                debited: item.custo,
                totalAfter
            };

        });

    }
}

module.exports = new lojaService();