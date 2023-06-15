const express = require('express');
const router = express.Router();
const models = require('../models');
const authenticateUser = require('../middlewares/auth');

// Rota GET para buscar todos as editoras
router.get('/', authenticateUser, async (req, res) => {
    try {
        const editora = await models.Editora.findAll();
        res.json(editora);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar uma nova editora
router.post('/', authenticateUser, async (req, res) => {
    try {
        const editora = await models.Editora.create(req.body);
        res.json(editora);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar uma Editora existente
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const editora = await models.Editora.findByPk(req.params.id);
        if (!editora) {
            return res.status(404).json({ error: 'Editora não encontrado' });
        }
        await editora.update(req.body);
        res.json(editora);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir uma Editora
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const editora = await models.Editora.findByPk(req.params.id);
        if (!editora) {
            return res.status(404).json({ error: 'Editora não encontrado' });
        }
        await editora.destroy();
        res.json({ message: 'Editora excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
