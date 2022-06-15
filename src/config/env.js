require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    PG_PORT: process.env.PG_PORT,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_DATABASE: process.env.PG_DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
}

