const { DataTypes } = require('sequelize')
const database = require('../config/database.js')

const requestModel = database.define('requestModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    id_products: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'request'
})

module.exports = requestModel

