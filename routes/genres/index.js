const express = require('express');

const getRepo = require('./repositories');
const { getGenreError } = require('./validation');

module.exports = ({ databaseType }) => {
  const router = express.Router();
  const repo = getRepo({ databaseType });

  router.get('/', async (_, res, next) => {
    try {
      const genres = await repo.findAll();
      res.send(genres);
    } catch (e) {
      next(e);
    }
  });

  router.post('/', async (req, res) => {
    const { genre } = req.body;

    const err = getGenreError(genre);
    if (err) {
      res.status(status).send({
        msg: err.message,
      });
      return;
    }

    try {
      const isNew = await repo.save(genre);
      res.sendStatus(isNew ? 201 : 200);
    } catch (e) {
      next(e);
    }
  });

  router.head('/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
      const isExisting = await repo.isExisting(genre);
      res.sendStatus(isExisting ? 200 : 404);
    } catch (e) {
      next(e);
    }
  });

  router.delete('/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
      await repo.delete(genre);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  });

  return router;
};
