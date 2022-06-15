module.exports = (sequelize, DataTypes) => {

    const Cashier = sequelize.define('cashier', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    }, {
        tableName: 'cashiers'
    })

    return Cashier
}

