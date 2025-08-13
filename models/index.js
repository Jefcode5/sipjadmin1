const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.Destinasi = require('./destinasi.model')(sequelize, Sequelize);
db.Akomodasi = require('./akomodasi.model')(sequelize, Sequelize);
db.Transportasi = require('./transportasi.model')(sequelize, Sequelize);
db.Kuliner = require('./kuliner.model')(sequelize, Sequelize);

module.exports = db;
