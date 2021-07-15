const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const Sequelize = require('sequelize');
const config = require('../config/');
const db = {};
let sequelize;
if (config.database.DATABASE_URL) {
  sequelize = new Sequelize(config.database.DATABASE_URL);
} else {
  sequelize = new Sequelize(config.database.dbname, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: config.database.logger || false,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}
fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => { 
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync();


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
