import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Hunger Bites',
        version: '1.0.0',
        description: 'Documentation for the APIs in Hunger Bites',
        contact: {
            name: 'Diksha Jaggi',
            email: 'diksha2000may@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:7000',
            description: 'Development server'
        }
    ],
    apis: ['./routes/*.ts']
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './routes/*.ts', './controllers/*.js', './controllers/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
