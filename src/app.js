const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const router = require('./config/router');

const app = express()

app.use(morgan("common"))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

module.exports = app