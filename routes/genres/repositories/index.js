module.exports = ({ databaseType }) => {
  switch (databaseType) {
    case 'redis': {
      const redis = require('redis');
      const Repository = require('./redis');
      const redisClient = redis.createClient();
      return new Repository(redisClient);
    }
    default:
      throw new Error(`unknown databaseType: ${databaseType}`);
  }
};
