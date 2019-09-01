const express = require('express');

const { beforeRoute, afterRoute } = require('./middleware');
const genres = require('./routes/genres');

const PORT = process.env.PORT || 3000;
const DB_TYPE = process.env.DB_TYPE || 'redis';

const app = express();

beforeRoute(app);

app.use('/api/genres/v1', genres({ databaseType: DB_TYPE }));

afterRoute(app);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}...`);
});
