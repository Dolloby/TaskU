const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu conexión de Sequelize
const { hash } = require('bcryptjs');

const Task = sequelize.define('Task', {
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'users',
    //         key: 'id'
    //     },
    //     allowNull: false
    // },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statusTask: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: false // Desactiva la creación automática de createdAt y updatedAt
});

module.exports = Task;