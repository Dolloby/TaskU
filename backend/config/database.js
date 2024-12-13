// config/database.js
const { Sequelize } = require('sequelize');

//Configuraci&oacute;n de conexi&oacute;n a la base de datos
const sequelize = new Sequelize(
        process.env.MYSQL_ADDON_DB || "TaskUDB",
        process.env.MYSQL_ADDON_USER || "root",
        process.env.MYSQL_ADDON_PASSWORD,
    {
    host: process.env.MYSQL_ADDON_HOST || "localhost", // Cambia el host si tu servidor de base de datos est&aacute; en otro lado
    dialect: process.env.MYSQL_ADDON_DIALECT || "mysql", // Cambia el
    port: process.env.MYSQL_ADDON_PORT || "3306", //
    logging: false, // Desactiva el log de consultas si prefieres que no se vean en la consola

});

module.exports = sequelize;