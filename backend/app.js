// app.js
require('dotenv').config();
const express = require('express');
const cors= require('cors');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
 
app.use(
    cors({
        origin:['http://localhost:3014'],
        // origin:['https://task-u.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)
app.use(express.json());
 
// Sincronizar la base de datos
sequelize.sync();

// console.log("Variables de entorno:", process.env);

// Rutas

//Ruta User
app.use('/api/user', userRoutes);
//Ruta Task
app.use('/api/task', taskRoutes);

module.exports = app;