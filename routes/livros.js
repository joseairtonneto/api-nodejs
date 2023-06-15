const express = require('express');
const router = express.Router();
const models = require('../models');
const authenticateUser = require('../middlewares/auth');

// Rota GET para buscar todos os livros
router.get('/', authenticateUser, async (req, res) => {
    try {
        const livros = await models.Livro.findAll();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar um novo livro
router.post('/', authenticateUser, async (req, res) => {
    try {
        const livro = await models.Livro.create(req.body);
        res.json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar um livro existente
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const livro = await models.Livro.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        await livro.update(req.body);
        res.json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir um livro
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const livro = await models.Livro.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        await livro.destroy();
        res.json({ message: 'Livro excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
