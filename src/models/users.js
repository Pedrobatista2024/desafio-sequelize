const { DataTypes } = require('sequelize')
const database = require('../config/database.js')

const UserModel = database.define('UserModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'
},{
    tableName: 'users',
    // BLINDAGEM AUTOMÁTICA: Esconde estes campos em qualquer consulta (findAll, findByPk, etc)
    defaultScope: {
        attributes: { 
            exclude: ['password', 'createdAt', 'updatedAt'] 
        }
    }
});

module.exports = UserModel