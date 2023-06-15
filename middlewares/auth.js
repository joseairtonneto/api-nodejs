const jwt = require('jsonwebtoken');

// Função de middleware de autenticação
const authenticateUser = (req, res, next) => {
    try {
        // Verificar se o token de autenticação está presente no cabeçalho da requisição
        const token = req.header('Authorization').replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: 'Acesso não autorizado' });
        }
        console.log(token)
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, 'chave-secreta-do-token');

        // Adicionar o ID do usuário decodificado à requisição para uso posterior
        req.userId = decoded.userId;

        // Continuar para a próxima etapa do fluxo de requisição
        next();
    } catch (error) {
        res.status(401).json({ error: 'Acesso não autorizado' });
    }
};

module.exports = authenticateUser;
