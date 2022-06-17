const env = require('./env');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: env.PG_PORT,
    logging: false
})

sequelize.cashiers = require('../components/cashiers/cashiers.model')(sequelize, DataTypes);
sequelize.products = require('../components/products/products.model')(sequelize, DataTypes);
sequelize.tickets = require('../components/tickets/tickets.model')(sequelize, DataTypes);
sequelize.ticketProducts = require('../components/tickets/ticket-products.model')(sequelize, DataTypes);

module.exports = sequelize
