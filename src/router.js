const { Router } = require('express');
const router = Router();

router.get('/', function (req, res) {
    res.writeHead(200);
    res.end("Hi there!");
});

const authRoutes = require('./auth/login.routes');
router.use(authRoutes);


module.exports = router