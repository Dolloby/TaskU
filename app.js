// app.js
require('dotenv').config();
const express = require('express');
const cors= require('cors');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
 
app.use(
    cors({
        origin:['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)
app.use(express.json());
 
// Sincronizar la base de datos
sequelize.sync();
 
// Rutas
app.use('/api/user', userRoutes);

module.exports = app;