const { promisify } = require('util');

const key = 'genres';

class GenresRepository {
  constructor(redisClient) {
    this.logger = console;
    this.redisClient = redisClient;
  }

  _handleDbError(err) {
    this.logger.error(err);
    throw new Error('database error');
  }

  async save(genre) {
    const add = promisify(this.redisClient.sadd).bind(this.redisClient);
    try {
      const reply = await add(key, genre);
      const isNew = Boolean(reply);
      return isNew;
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async findAll() {
    const members = promisify(this.redisClient.smembers).bind(this.redisClient);
    try {
      const genres = await members(key);
      return genres || [];
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async isExisting(genre) {
    const ismember = promisify(this.redisClient.sismember).bind(this.redisClient);
    try {
      const reply = await ismember(key, genre);
      return Boolean(reply);
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async delete(genre) {
    const rem = promisify(this.redisClient.srem).bind(this.redisClient);
    try {
      await rem(key, genre);
    } catch (err) {
      this._handleDbError(err);
    }
  }
}

module.exports = GenresRepository;
