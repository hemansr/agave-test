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
        subtotalAmmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        discountAmmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        totalAmmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    }, {
        tableName: 'tickets'
    })

    return Tickets
}
