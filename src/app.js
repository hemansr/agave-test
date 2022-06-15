const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const env = require('./config/env')
const db = require('./config/db-connection');
const router = require('./router');
require('./auth/auth.config');

const app = express()

app.use(morgan("common"))

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

db.sync()
    .then(result => {
        console.log('Database connected!');
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