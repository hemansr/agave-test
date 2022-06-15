const { Router } = require('express');
const router = Router();

const middleware = require('./auth.middlewares');

router.post('/login', middleware.passportLogin);

module.exports = router