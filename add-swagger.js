const swaggerUi = require('swagger-ui-express');

module.exports = app => {
  const swaggerJSDoc = require('swagger-jsdoc');

  const options = {
    definition: {
      openapi: '3.0.0', // 2.0 is default
      info: {
        title: 'Genres',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development',
        },
      ],
    },
    apis: ['./routes/genres/index.js'],
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
