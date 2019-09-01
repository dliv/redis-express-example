class GenresMemoryRepository {
  constructor() {
    this.genres = new Set();
    this.logger = console;
  }

  _handleDbError(err) {
    this.logger.error(err);
    throw new Error('memory database error');
  }

  async save(genre) {
    try {
      if (this.genres.has(genre)) {
        return false;
      }
      this.genres.add(genre);
      return true;
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async findAll() {
    try {
      return Array.from(this.genres);
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async isExisting(genre) {
    try {
      return this.genres.has(genre);
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async delete(genre) {
    try {
      this.genres.delete(genre);
    } catch (err) {
      this._handleDbError(err);
    }
  }
}

module.exports = GenresMemoryRepository;
