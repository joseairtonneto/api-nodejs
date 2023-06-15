const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Livros e Editoras',
            version: '1.0.0',
            description: 'Documentação da API de Livros e Editoras',
        },
        servers: [
            {
                url: 'http://localhost:3000', // atualize com a URL da sua API
            },
        ],
    },
    apis: ['./routes/*.js'], // diretório das suas rotas
};

const specs = swaggerJSDoc(options);

module.exports = specs;
