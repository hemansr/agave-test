const { Router } = require('express');
const router = Router();

const controller = require('./auth.controller');

router.post('/login', controller.login);

module.exports = router