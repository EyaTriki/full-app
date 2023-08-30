const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your project'
        },
        servers: [
            {
                url: 'http://localhost:5001', 
            }
        ],
    },
    apis: ['./routes/*.js'], 
};

const specs = swaggerJsDoc(options);

module.exports = specs;
