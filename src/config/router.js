const { Router } = require('express');
const router = Router();

router.get('/', function (req, res) {
    res.writeHead(200);
    res.end("Hi there!");
});

const authRoutes = require('../auth/auth.routes');
router.use(authRoutes);

const ticketsRoutes = require('../components/tickets/tickets.routes');
router.use(ticketsRoutes);


module.exports = router