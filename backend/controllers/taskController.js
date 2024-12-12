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
        const expirationDate = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss'); // A�ade un mes a la fecha de creación para expiración de la tarea

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
        res.status(500).json({ error: 'Error de creaci&oacute;n de tarea.' + error});
    }
};

// // Login de usuario
// exports.login = async (req, res) => {
//     const { mail, pass } = req.body;
//     try {
//         const user = await User.findOne({ where: { mail } });
//         if (!user || !(await bcrypt.compare(pass, user.pass))) {
//         return res.status(401).json({ error: 'Credenciales incorrectas' });
//         }
//         const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//         res.json({ message: 'Login exitoso', token });
//     } catch (error) {
//         res.status(500).json({ error: 'Error en el login' });
//     }
// };

// Obtener datos de la tarea
exports.filterTask = async (req, res) => {
    try {
        const task = await Task.findAll({where: {statusTask: 'todo'}});
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener Tarea' + error});
    }
};

exports.modifyState = async (req, res) => {
    const { statusTask } = req.body;
    try {
        const task = await Task.findByPk(req.taskId);
        await task.update({ statusTask });
        res.status(201).json({ message: 'Tarea actualizada exitosamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
};

exports.modifyTask = async (req, res) => {
    const { title, description, expirationDate, priority} = req.body;
    try {
    //const hashedPass = await bcrypt.hash(pass, 10);
    const task = await Task.findByPk(req.taskId);
    await task.update({
        title,
        description,
        expirationDate,
        priority
    });
    res.status(201).json({ message: 'Tarea actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea ' + error });
    }
};