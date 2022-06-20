const sequelize = require('../../config/database');
const services = require('./tickets.service');

const createTicket = async (req, res, next) => {

    try {

        const cashierId = req.user.id;

        const cashierOpenTicket = await services.getCashierOpenTicket(cashierId);
        if (cashierOpenTicket) {
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

const addTicketProduct = async (req, res, next) => {

    try {

        const inputData = {
            cashierId: req.user.id,
            ticketId: req.body.ticketId,
            productCode: req.body.productCode
        }

        const data = await services.getData(inputData);
        if (!data.ok)
            return res.status(200).json({ ok: false, message: data.message });

        const newTicketProduct = await sequelize.ticketProducts.create({ ticket: inputData.ticketId, product: data.product.id })

        const ticketSummary = await services.getTicketSummary(inputData.ticketId)

        return res.status(200).json({
            ok: true,
            ticketProduct: newTicketProduct,
            ticketSummary,
            message: 'Ticket product added!'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'A server error ocurred'
        })
    }
}

const ticketCheckout = async (req, res, next) => {

    try {

        const cashierId = req.user.id
        const ticketId = req.body.ticketId

        const ticket = await sequelize.tickets.findByPk(ticketId, { raw: true });

        if (!ticket || ticket.cashierId !== cashierId)
            return res.status(200).json({ ok: false, message: 'Invalid ticket Id' });
        if (ticket.status !== 'open')
            return res.status(200).json({ ok: false, message: 'Ticket not open' });


        const ticketSummary = await services.getTicketSummary(ticketId)

        const ticketUpdated = await sequelize.tickets.update(
            {
                status: 'closed',
                subtotalAmmount: ticketSummary.subtotalAmmount,
                discountAmmount: ticketSummary.discountAmmount,
                totalAmmount: ticketSummary.totalAmmount
            },
            { where: { id: ticketId } }
        );

        return res.status(200).json({
            ok: true,
            ticketSummary,
            message: 'Ticket closed!'
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
    createTicket,
    addTicketProduct,
    ticketCheckout
};
