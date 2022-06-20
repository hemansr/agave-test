const env = require('./config/env')
const app = require('./app');
const db = require('./config/database');
require('./auth/auth.config');
const { createDefaultCashier, createDefaultProducts } = require('./utils/db-init');

// db.sync()
db.sync({ force: true })
    .then(result => {
        console.log('Database connected!');
        createDefaultCashier()
        createDefaultProducts()
        startServer();
    })
    .catch(error => {
        console.log(error);
        console.log('Unable to connect to the database: ', error);
        process.exit(1)
    })

const startServer = () => {
    app.listen(env.PORT, '0.0.0.0', () => {
        console.log(`App running at port ${env.PORT}`)
    });
}