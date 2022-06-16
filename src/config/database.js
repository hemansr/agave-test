const env = require('./env');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: env.PG_PORT
})

sequelize.cashiers = require('../components/cashiers/cashiers.model')(sequelize, DataTypes);
sequelize.products = require('../components/products/products.model')(sequelize, DataTypes);

module.exports = sequelize
