// config/database.js
const { Sequelize } = require('sequelize');
// const config = require('./config.json');

//Configuraci&oacute;n de conexi&oacute;n a la base de datos
const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
    {
    host: process.env.DB_HOST, // Cambia el host si tu servidor de base de datos est&aacute; en otro lado
    dialect: process.env.DB_DIALECT, // Cambia el
    port: process.env.DB_PORT, //
    logging: false, // Desactiva el log de consultas si prefieres que no se vean en la consola

});

FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3014"

module.exports = sequelize;