const { Router } = require('express');
const passport = require('passport')

const controller = require('./tickets.controller');
const router = Router();

router.post('/ticket', passport.authenticate('jwt', { session: false }), controller.createTicket);
router.post('/ticket/product', passport.authenticate('jwt', { session: false }), controller.addTicketProduct);

module.exports = router