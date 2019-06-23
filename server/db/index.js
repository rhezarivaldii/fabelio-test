'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'prod';
const config    = require(__dirname + '/../config/db_config.json')[env];
const db        = {};

let sequelize = null;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(`${__dirname}/models`)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(`${__dirname}/models`, file));
    db[model.name] = model;
  });

// Object.keys(db).forEach((modelName) => {
//     console.log(db[modelName].associate);
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

console.log(db);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.product = require('./models/product')(sequelize, Sequelize);
db.productPrice = require('./models/productPrice')(sequelize, Sequelize);
db.vote = require('./models/vote')(sequelize, Sequelize);
db.comment = require('./models/comment')(sequelize, Sequelize);

db.product.latestProductPrice = db.product.hasMany(db.productPrice, {as: 'prices', foreignKey: 'ProductId'});
db.productPrice.belongsTo(db.product, {foreignKey: 'ProductId'});

db.product.hasMany(db.comment, {as: 'comments', foreignKey: 'ProductId'});
db.comment.belongsTo(db.product, {foreignKey: 'ProductId'});

db.comment.hasOne(db.vote, {as: 'votes', foreignKey: 'CommentId'});

module.exports = db;