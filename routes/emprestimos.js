const express = require('express');
const router = express.Router();
const model = require('../models');
const authenticateUser = require("../middlewares/auth");

// Rota GET para buscar todos os empréstimos
router.get('/', authenticateUser, async (req, res) => {
    try {
        const emprestimos = await model.Emprestimo.findAll();
        res.json(emprestimos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST para criar um novo empréstimo
router.post('/', authenticateUser, async (req, res) => {
    try {
        const emprestimo = await model.Emprestimo.create(req.body);
        res.json(emprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar um empréstimo existente
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const emprestimo = await model.Emprestimo.findByPk(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        await emprestimo.update(req.body);
        res.json(emprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para excluir um empréstimo
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const emprestimo = await model.Emprestimo.findByPk(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        await emprestimo.destroy();
        res.json({ message: 'Empréstimo excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
