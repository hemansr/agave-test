module.exports = (sequelize, DataTypes) => {

    const TicketProducts = sequelize.define('ticketProducts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ticket: { type: DataTypes.INTEGER, allowNull: false },
        product: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'ticketProducts'
    })

    return TicketProducts
}
