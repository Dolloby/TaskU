require('dotenv').config();
const express = require('express');
const cors= require('cors');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
//const middleware = require('../backend/middleware/auth');

// Configuración de CORS para permitir comunicación con el frontend
app.use(
    cors({
        origin: 'https://task-u.vercel.app/',
        // origin: process.env.REACT_APP_API_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)
app.use(express.json());

// Sincronizar la base de datos
sequelize.sync();

// Rutas
//Ruta User
app.use('/user', userRoutes);
//Ruta Task
app.use('/task', taskRoutes);

//app.use(middleware);

module.exports = app;