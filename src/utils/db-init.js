const bcrypt = require('bcryptjs');
const { cashiers, products } = require('../config/database');

const password = bcrypt.hashSync('123456', 12)

const createDefaultCashier = async () => {

    const defaultCashier = await cashiers.create({
        username: 'defaultCashier',
        password
    });

    console.log('Cashier created: ' + defaultCashier);

}

const createDefaultProducts = async () => {

    let defaultProduct = await products.create({
        code: 'PANTS',
        name: 'Pants',
        price: 5
    });

    console.log('Cashier created: ' + defaultProduct);

    defaultProduct = await products.create({
        code: 'TSHIRT',
        name: 'T-Shirt',
        price: 20
    });

    console.log('Cashier created: ' + defaultProduct);

    defaultProduct = await products.create({
        code: 'HAT',
        name: 'Hat',
        price: 7.5
    });

    console.log('Cashier created: ' + defaultProduct);

}

module.exports = {
    createDefaultCashier,
    createDefaultProducts
}