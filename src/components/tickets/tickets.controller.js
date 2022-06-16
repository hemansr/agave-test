const env = require('../../config/env');
const sequelize = require('../../config/database');

const createTicket = async (req, res, next) => {

    try {

        const cashierId = req.user.id;

        const openTicket = await sequelize.tickets.findOne({ where: { cashierId, status: 'open' } })
        if (openTicket) {
            return res.status(200).json({
                ok: false,
                message: 'There is an open ticket for the cashier'
            })
        }

        const newTicket = await sequelize.tickets.create({ cashierId })

        return res.status(200).json({
            ok: true,
            ticket: newTicket,
            message: 'Ticket created!'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'A server error ocurred'
        })
    }
}


module.exports = {
    createTicket
};
