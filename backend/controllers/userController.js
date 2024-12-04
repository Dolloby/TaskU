// controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro de usuario
exports.register = async (req, res) => {
    const { name, lastname, mail, pass, phone, address} = req.body;
    try {
    const hashedClave = await bcrypt.hash(pass, 10);
    const user = await User.create({
        name,
        lastname,
        mail,
        pass: hashedClave,
        phone,
        address
    });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario'});
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { mail, pass } = req.body;
    try {
        const user = await User.findOne({ where: { mail } });
        if (!user || !(await bcrypt.compare(pass, user.pass))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
};

// Obtener datos del usuario
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: { exclude: ['pass'] } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

exports.changePassword = async (req, res) => {
    const { actualPass, newPass } = req.body;
    try {
        const user = await User.findByPk(req.userId);
        if (!user ||!(await bcrypt.compare(actualPass, user.pass))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const hashedNewPass = await bcrypt.hash(newPass, 10);
        await user.update({ clave: hashedNewPass });
        res.json({ message: 'Contraseña cambiada exitosamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al cambiar contraseña' });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, lastname, mail, phone, address} = req.body;
    try {
    //const hashedPass = await bcrypt.hash(pass, 10);
    const user = await User.findByPk(req.userId);
    await user.update({
        name,
        lastname,
        mail,
        phone,
        address
    });
    res.status(201).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario ' + error });
    }
};