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

        // email é obrigatório para criar a conta de acesso
        if (!dados.email) {
            throw new Error('Email é obrigatório para registro.');
        }

        // evitar email duplicado
        const contaExistente = await prisma.contaAcesso.findUnique({
            where: { email: dados.email }
        });
        if (contaExistente) {
            throw new Error('Já existe uma conta com este email.');
        }

        // criar conta de acesso ligada ao usuário
        await prisma.contaAcesso.create({
            data: {
                usuarioId: novoUsuario.id,
                email: dados.email,
                passwordHash: hashSenha
            }
        });

        return {
            usuario_id: novoUsuario.id,
            nome: novoUsuario.nome,
            documento_fiscal: novoUsuario.documentoFiscal
        };
    }

    async login(identifier, senha) {
        let conta = null;

        // se identifier parece um email
        if (identifier && identifier.includes('@')) {
            conta = await prisma.contaAcesso.findUnique({
                where: { email: identifier },
                include: { usuario: true }
            });
        } else {
            // buscar usuário pelo documento e então uma conta ligada a ele
            const usuario = await prisma.usuario.findUnique({
                where: { documentoFiscal: identifier }
            });

            if (usuario) {
                conta = await prisma.contaAcesso.findFirst({
                    where: { usuarioId: usuario.id },
                    include: { usuario: true }
                });
            }
        }

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
                tipo: conta.usuario.tipoPessoa,
                email: conta.email
            }
        };
    }
}

module.exports = new AuthService();