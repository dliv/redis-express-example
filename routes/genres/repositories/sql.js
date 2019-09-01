const Sequelize = require('sequelize');

const getDefaultConnection = () => {
  return new Sequelize({
    dialect: 'sqlite',
    storage: 'tmp/database.sqlite',
  });
};

class GenresSqlRepository {
  constructor(connection = getDefaultConnection()) {
    this.logger = console;

    class Genre extends Sequelize.Model {}

    Genre.init(
      {
        genre: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
        modelName: 'genre',
        timestamps: false,
      },
    );

    // would be better to expose this so traffic could be delayed until here
    Genre.sync().then(() => {
      console.debug('Sequelize connection ready.');
    });

    this.client = Genre;
  }

  _handleDbError(err) {
    this.logger.error(err);
    throw new Error('database error');
  }

  async save(genre) {
    try {
      const [, isNew] = await this.client.findOrCreate({
        where: {
          genre,
        },
      });
      return isNew;
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async findAll() {
    try {
      const rows = await this.client.findAll();
      return rows.map(r => r.genre);
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async isExisting(genre) {
    try {
      const match = await this.client.findByPk(genre);
      return Boolean(match);
    } catch (err) {
      this._handleDbError(err);
    }
  }

  async delete(genre) {
    try {
      await this.client.destroy({
        where: {
          genre,
        },
      });
    } catch (err) {
      this._handleDbError(err);
    }
  }
}

module.exports = GenresSqlRepository;
