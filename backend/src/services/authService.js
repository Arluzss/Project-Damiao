const prisma = require('../config/prismaClient'); // Importa sua conexão
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {

    async register(dados) {
       
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                documento_fiscal: dados.documento_fiscal
            }
        });

        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado com este documento.');
        }

       
        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(dados.senha, salt);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: dados.nome,
                documento_fiscal: dados.documento_fiscal,
                tipo_pessoa: dados.tipo_pessoa,
                senha: hashSenha 
            }
        });

       
        return {
            usuario_id: novoUsuario.usuario_id,
            nome: novoUsuario.nome,
            documento_fiscal: novoUsuario.documento_fiscal
        };
    }

    async login(documento_fiscal, senha) {
        const usuario = await prisma.usuario.findUnique({
            where: { documento_fiscal }
        });

        if (!usuario) {
            throw new Error('Credenciais inválidas (Usuário não encontrado)');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error('Credenciais inválidas (Senha incorreta)');
        }

        const token = jwt.sign(
            { 
                id: usuario.usuario_id,
                nome: usuario.nome
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        return {
            token: token,
            usuario: {
                id: usuario.usuario_id,
                nome: usuario.nome,
                tipo: usuario.tipo_pessoa
            }
        };
    }
}

module.exports = new AuthService();