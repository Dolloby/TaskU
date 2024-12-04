// config/database.js
const { Sequelize } = require('sequelize');
// const config = require('./config.json');

//Configuración de conexión a la base de datos
const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST, // Cambia el host si tu servidor de base de datos está en otro lado
    dialect:process.env.DB_DIALECT, // Cambia el
    port: process.env.DB_PORT, //
    logging: false, // Desactiva el log de consultas si prefieres que no se vean en la consola
});

module.exports = sequelize;