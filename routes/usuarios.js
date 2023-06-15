const express = require('express');
const router = express.Router();
const model = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota POST para login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        // Verificar se o usuário existe no banco de dados
        const usuario = await model.Usuario.findOne({ where: { email:email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token de autenticação
        const token = jwt.sign({ userId: usuario.id }, 'chave-secreta-do-token', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET para buscar todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await model.Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET para buscar um usuário específico por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await model.Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se o usuário já existe
        const usuarioExistente = await model.Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'O usuário já existe' });
        }
        // Criptografar a senha antes de salvar no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Criar o usuário
        const usuario = await model.Usuario.create({ nome, email, senha: senhaCriptografada });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar um usuário existente
router.put('/:id', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se o usuário existe
        const usuario = await model.Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualizar os dados do usuário
        usuario.nome = nome;
        usuario.email = email;

        if (senha) {
            // Criptografar a nova senha antes de salvar no banco de dados
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            usuario.senha = senhaCriptografada;
        }

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir um usuário
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await model.Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await usuario.destroy();

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
