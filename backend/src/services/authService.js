const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {

    async register(dados) {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { documentoFiscal: dados.documento_fiscal }
        });

        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado com este documento.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(dados.senha, salt);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: dados.nome,
                documentoFiscal: dados.documento_fiscal,
                tipoPessoa: dados.tipo_pessoa
            }
        });

        // criar conta de acesso ligada ao usuário
        await prisma.contaAcesso.create({
            data: {
                usuarioId: novoUsuario.id,
                documentoFiscal: dados.documento_fiscal,
                passwordHash: hashSenha
            }
        });

        return {
            usuario_id: novoUsuario.id,
            nome: novoUsuario.nome,
            documento_fiscal: novoUsuario.documentoFiscal
        };
    }

    async login(documento_fiscal, senha) {
        const conta = await prisma.contaAcesso.findUnique({
            where: { documentoFiscal: documento_fiscal },
            include: { usuario: true }
        });

        if (!conta) {
            throw new Error('Credenciais inválidas (Conta não encontrada)');
        }

        const senhaValida = await bcrypt.compare(senha, conta.passwordHash);

        if (!senhaValida) {
            throw new Error('Credenciais inválidas (Senha incorreta)');
        }

        // atualizar último login
        await prisma.contaAcesso.update({
            where: { id: conta.id },
            data: { lastLogin: new Date() }
        });

        const token = jwt.sign(
            {
                id: conta.usuario.id,
                nome: conta.usuario.nome
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        return {
            token: token,
            usuario: {
                id: conta.usuario.id,
                nome: conta.usuario.nome,
                tipo: conta.usuario.tipoPessoa
            }
        };
    }
}

module.exports = new AuthService();