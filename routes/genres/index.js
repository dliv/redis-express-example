const express = require('express');

const getRepo = require('./repositories');
const { getGenreError } = require('./validation');

/**
 * @swagger
 *
 * definitions:
 *   Genre:
 *     type: object
 *     required:
 *       - genre
 *     properties:
 *       genre:
 *         type: string
 */

module.exports = ({ databaseType }) => {
  const router = express.Router();
  const repo = getRepo({ databaseType });

  /**
   * @swagger
   *
   * /api/genres/v1:
   *   get:
   *     description: Returns all genres
   *     tags:
   *       - genres
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: genres
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Genre'
   */
  router.get('/', async (_, res, next) => {
    try {
      const genres = await repo.findAll();
      res.send(genres);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @swagger
   *
   * /api/genres/v1:
   *   post:
   *     description: Creates a genre
   *     tags:
   *       - genres
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/Genre'
   *     responses:
   *       200:
   *         description: Genre already existed
   *       201:
   *         description: Genre was created
   */
  router.post('/', async (req, res) => {
    const { genre } = req.body;

    const err = getGenreError(genre);
    if (err) {
      res.status(400).send({
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

  /**
   * @swagger
   *
   * /api/genres/v1/{genre}:
   *   head:
   *     description: Checks if a genre exists
   *     tags:
   *       - genres
   *     parameters:
   *     - name: genre
   *       description: The genre to check
   *       in: path
   *       required: true
   *       schema:
   *         type: string
   *     responses:
   *       200:
   *         description: Genre exists
   *       404:
   *         description: Genre does not exist
   */
  router.head('/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
      const isExisting = await repo.isExisting(genre);
      res.sendStatus(isExisting ? 200 : 404);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @swagger
   *
   * /api/genres/v1/{genre}:
   *   delete:
   *     description: Deletes a genre if it exists (does not fail if genre does not exist)
   *     tags:
   *       - genres
   *     parameters:
   *     - name: genre
   *       description: The genre to delete
   *       in: path
   *       required: true
   *       schema:
   *         type: string
   *     responses:
   *       204:
   *         description: Genre has been removed (or did not exist)
   */
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
