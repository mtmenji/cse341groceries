const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Grocery List API',
        description: 'Api to create and maintain a grocery shopping list.'
    },
    host: 'cse-341-project2-lvub.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);