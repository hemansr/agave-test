module.exports = (sequelize, DataTypes) => {

    const Products = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false }
    },{
        tableName: 'products'
    })

    return Products
}
