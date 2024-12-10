// config/database.js
const { Sequelize } = require('sequelize');
// const config = require('./config.json');

//Configuraci&oacute;n de conexi&oacute;n a la base de datos
const sequelize = new Sequelize(
        process.env.REACT_APP_BACKEND_URL.DB_NAME,
        process.env.REACT_APP_BACKEND_URL.DB_USER,
        process.env.REACT_APP_BACKEND_URL.DB_PASS,
    {
    host: process.env.REACT_APP_BACKEND_URL.DB_HOST, // Cambia el host si tu servidor de base de datos est&aacute; en otro lado
    dialect:process.env.REACT_APP_BACKEND_URL.DB_DIALECT, // Cambia el
    port: process.env.REACT_APP_BACKEND_URL.DB_PORT, //
    logging: false, // Desactiva el log de consultas si prefieres que no se vean en la consola
});

module.exports = sequelize;