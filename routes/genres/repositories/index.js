module.exports = ({ databaseType }) => {
  switch (databaseType) {
    case 'memory': {
      const Repository = require('./memory');
      return new Repository();
    }
    case 'redis': {
      const Repository = require('./redis');
      return new Repository();
    }
    case 'sql': {
      const Repository = require('./sql');
      return new Repository();
    }
    default:
      throw new Error(`unknown databaseType: ${databaseType}`);
  }
};
