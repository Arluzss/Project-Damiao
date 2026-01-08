const prisma = require('../lib/prisma');

class ProfileService {
  async getProfileById(userId) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { contasAcesso: true }
    });

    if (!usuario) throw new Error('Usuário não encontrado');

    const email = usuario.contasAcesso && usuario.contasAcesso[0] && usuario.contasAcesso[0].email;

    // calcular saldo (soma dos pontos)
    const pontos = await prisma.extratoPontos.aggregate({
      _sum: { quantidade: true },
      where: { usuarioId: userId }
    });

    const damiao = (pontos._sum.quantidade || 0);

    return {
      id: usuario.id,
      name: usuario.nome,
      email: email || null,
      type: usuario.tipoPessoa,
      damiao,
      courses: []
    };
  }

  async updateProfile(userId, dados) {
    const updates = {};
    if (dados.name || dados.nome) updates.nome = dados.name || dados.nome;

    let usuarioAtualizado = null;

    if (Object.keys(updates).length) {
      usuarioAtualizado = await prisma.usuario.update({
        where: { id: userId },
        data: updates
      });
    } else {
      usuarioAtualizado = await prisma.usuario.findUnique({ where: { id: userId } });
    }

    let emailAtualizado = null;
    if (dados.email) {
      // atualizar a primeira conta de acesso vinculada
      const conta = await prisma.contaAcesso.findFirst({ where: { usuarioId: userId } });
      if (conta) {
        // evitar email duplicado
        const existente = await prisma.contaAcesso.findUnique({ where: { email: dados.email } });
        if (existente && existente.id !== conta.id) {
          throw new Error('Email já está em uso');
        }
        const contaAtualizada = await prisma.contaAcesso.update({ 
          where: { id: conta.id }, 
          data: { email: dados.email } 
        });
        emailAtualizado = contaAtualizada.email;
      }
    } else {
      // buscar email atual
      const conta = await prisma.contaAcesso.findFirst({ where: { usuarioId: userId } });
      emailAtualizado = conta?.email || null;
    }

    return { 
      id: usuarioAtualizado.id, 
      nome: usuarioAtualizado.nome,
      email: emailAtualizado
    };
  }

  async getUserCourses(userId) {
    // Não há modelo de cursos no schema atual; retornar array vazio para compatibilidade
    return [];
  }

  async getBalance(userId) {
    const pontos = await prisma.extratoPontos.aggregate({
      _sum: { quantidade: true },
      where: { usuarioId: userId }
    });
    return (pontos._sum.quantidade || 0);
  }
}

module.exports = new ProfileService();
