const express = require('express');
const router = express.Router();
const models = require('../models');
const authenticateUser = require('../middlewares/auth');

// Rota GET para buscar todos as Resenhas
router.get('/', authenticateUser, async (req, res) => {
    try {
        const resenha = await models.Resenha.findAll();
        res.json(resenha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar uma nova Resenha
router.post('/', authenticateUser, async (req, res) => {
    try {
        const resenha = await models.Resenha.create(req.body);
        res.json(resenha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar uma resenha existente
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const resenha = await models.Resenha.findByPk(req.params.id);
        if (!resenha) {
            return res.status(404).json({ error: 'resenha não encontrada' });
        }
        await resenha.update(req.body);
        res.json(resenha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir uma resenha
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const resenha = await models.Resenha.findByPk(req.params.id);
        if (!resenha) {
            return res.status(404).json({ error: 'resenha não encontrada' });
        }
        await resenha.destroy();
        res.json({ message: 'resenha excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
