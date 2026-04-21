const { DataTypes } = require('sequelize')
const database = require('../config/database.js')

const produtcsModel = database.define('produtcsModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(10,2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'produtcs'
})

module.exports = produtcsModel