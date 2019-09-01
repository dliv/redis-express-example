const express = require('express');

const addSwagger = require('./add-swagger');
const { beforeRoute, afterRoute } = require('./middleware');
const genres = require('./routes/genres');

const PORT = process.env.PORT || 3000;
const DB_TYPE = process.env.DB_TYPE || 'memory';

const app = express();

addSwagger(app);

beforeRoute(app);

app.use('/api/genres/v1', genres({ databaseType: DB_TYPE }));

afterRoute(app);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}...`);
});
