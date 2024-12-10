const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu conexión de Sequelize
const User = require('./user');

const Task = sequelize.define('Task', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
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
    tag: {
        type: DataTypes.ENUM('frontend', 'backend', 'fullstack'),
        defaultValue: 'frontend',
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        defaultValue: 'baja',
        allowNull: false
    },
    statusTask: {
        type: DataTypes.ENUM('todo', 'inprogress', 'done'),
        defaultValue: 'todo',
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: false // Desactiva la creación automática de createdAt y updatedAt
});

// Relación con Usuario y Habitacion
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });

module.exports = Task;