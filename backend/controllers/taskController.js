// controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const User = require('../models/user');
const dayjs = require('dayjs')

// Creación de tarea
exports.addTask = async (req, res) => {
    const { user_id, title, description, tag, priority, statusTask} = req.body;
    try {
        const user = await User.findByPk(user_id);
        const creationDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const expirationDate = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss'); // Añade un mes a la fecha de creación para expiración de la tarea

        const task = await Task.create({
            user_id,
            title,
            description,
            creationDate,
            expirationDate,
            tag,
            priority,
            statusTask
        });
        res.status(201).json({ message: 'Tarea creada exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error de creaci&oacute;n de tarea.' + ' ' + error});
    }
};

// Obtener datos de la tarea
exports.filterTask = async (req, res) => {
    const { statusTask } = req.params; // Obtener el estado desde los parámetros
    const userId = req.userId;

    try {
        const tasks = await Task.findAll({ 
            where: { statusTask, user_id: userId },
            attributes: ['id', 'title', 'statusTask', 'description', 'expirationDate', 'tag', 'priority'],
        });
        if (!tasks || tasks.length === 0) {
            return res.status(200).json([]);
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas: ' + error.message });
    }
};

exports.updateTask= async (req, res) => {
    const { title, description, tag, priority, statusTask} = req.body;
    const { id } = req.params;
    try {
    const task = await Task.findByPk(id);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.update({
        title,
        description,
        tag,
        priority,
        statusTask
    });
    res.status(201).json({ message: 'Tarea actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea ' + error.message });
    }

};

exports.deleteTask = async (req, res) => {
    const { id } = req.params; // Captura el ID de la tarea desde los parámetros

    try {
        const deletedTask = await Task.destroy({
            where: { id }
        });

        if (!deletedTask) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
    }
};