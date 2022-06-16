module.exports = (sequelize, DataTypes) => {

    const Tickets = sequelize.define('tickets', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cashierId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'open'
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    }, {
        tableName: 'tickets'
    })

    return Tickets
}
