const express = require('express');
const router = express.Router();
const models = require('../models');
const authenticateUser = require('../middlewares/auth');

// Rota GET para buscar todos os autores
router.get('/', authenticateUser, async (req, res) => {
    try {
        const autor = await models.Autor.findAll();
        res.json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar um novo autor
router.post('/', authenticateUser, async (req, res) => {
    try {
        const autor = await models.Autor.create(req.body);
        res.json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar um autor existente
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const autor = await models.Autor.findByPk(req.params.id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        await autor.update(req.body);
        res.json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir um autor
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const autor = await models.Autor.findByPk(req.params.id);
        if (!autor) {
            return res.status(404).json({ error: 'autor não encontrado' });
        }
        await autor.destroy();
        res.json({ message: 'autor excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
