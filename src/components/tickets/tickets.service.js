const { Op } = require("sequelize");
const _ = require('underscore');
const sequelize = require('../../config/database');

const getCashierOpenTicket = async (cashierId) => {
    const openTicket = await sequelize.tickets.findOne({ where: { cashierId, status: 'open' } })

    return openTicket
}

const getData = async ({ cashierId, ticketId, productCode }) => {
    const ticketConsult = sequelize.tickets.findByPk(ticketId)
    const productConsult = sequelize.products.findOne({ where: { code: productCode } })

    const consults = await Promise.all([ticketConsult, productConsult])

    if (!consults[0])
        return { ok: false, message: 'Invalid ticket' }
    if (consults[0].cashierId !== cashierId)
        return { ok: false, message: 'Invalid ticket and cashier' }
    if (consults[0].status !== 'open')
        return { ok: false, message: 'Ticket not open' }

    if (!consults[1])
        return { ok: false, message: 'Invalid product code' }

    return {
        ok: true,
        ticket: consults[0],
        product: consults[1],
    }

}

const getTicketSummary = async (ticketId) => {

    const ticketProducts = await getTicketProducts(ticketId)
    const totalProducts = getTotalProducts(ticketProducts)
    const subtotalAmmount = getSubtotalAmmount(ticketProducts)
    let totalAmmount = subtotalAmmount;

    const summary = {
        totalProducts,
        subtotalAmmount,
        discountAmmount: 0
    }

    const tshirtDiscount = getTshirtDiscount(ticketProducts);
    if (tshirtDiscount > 0) {
        totalAmmount -= tshirtDiscount;
        summary.tshirtDiscount = tshirtDiscount
        summary.discountAmmount += tshirtDiscount
    }

    const pantsDiscount = getPantsDiscount(ticketProducts);
    if (pantsDiscount > 0) {
        totalAmmount -= pantsDiscount;
        summary.pantsDiscount = pantsDiscount
        summary.discountAmmount += pantsDiscount
    }

    summary.totalAmmount = totalAmmount
    summary.products = ticketProducts

    return summary
}

const getTicketProducts = async (ticketId) => {

    const products = await sequelize.ticketProducts.findAll({
        where: { ticket: ticketId },
        raw: true
    }).then(result => {
        let productsIds = result.map(x => { return x.product })
        productsIds = _.uniq(productsIds)
        const summary = []
        productsIds.forEach(productId => {
            const product = {
                id: productId,
                quantity: result.filter(x => x.product == productId).length
            }
            summary.push(product)
        });
        return { productsIds, summary }
    })

    const ticketProducts = await sequelize.products.findAll({
        where: { id: { [Op.in]: products.productsIds } },
        raw: true
    }).then(ticketProducts => {
        return ticketProducts.map(product => {
            let newProduct = _.omit(product, 'createdAt', 'updatedAt')
            let productQuantity = products.summary.find(x => x.id == product.id)
            newProduct.quantity = productQuantity.quantity
            return newProduct
        })
    })

    return ticketProducts
}

const getTotalProducts = (ticketProducts) => {
    let totalProducts = 0;
    ticketProducts.forEach(product => {
        totalProducts += product.quantity
    });

    return totalProducts
}

const getSubtotalAmmount = (ticketProducts) => {
    let subtotalAmmount = 0;
    ticketProducts.forEach(product => {
        subtotalAmmount += (product.quantity * product.price)
    });
    return subtotalAmmount
}

const getTshirtDiscount = (ticketProducts) => {
    let discount = 0;

    const tshirtSummary = ticketProducts.find(x => x.code === 'TSHIRT');
    if (!tshirtSummary) return discount;

    if (tshirtSummary.quantity >= 3)
        discount = tshirtSummary.quantity;

    return discount;
}

const getPantsDiscount = (ticketProducts) => {
    let discount = 0;

    const pantsSummary = ticketProducts.find(x => x.code === 'PANTS');
    if (!pantsSummary) return discount;

    const promos = Math.floor(pantsSummary.quantity / 3)
    if (promos > 0)
        discount = promos * pantsSummary.price

    return discount;
}


module.exports = {
    getCashierOpenTicket,
    getData,
    getTicketSummary
};
