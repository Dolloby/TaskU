// controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');

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
        await user.update({ pass: hashedNewPass });
        res.json({ message: 'Contrase\u00F1a cambiada exitosamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al cambiar contrase\u00F1a' });
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
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }

};
exports.forgotPassword = async (req, res) => {
    const { mail } = req.body;
    try {
        const user = await User.findOne({ where: {mail} });
        if (!user) return res.status(404).json({ error: 'Email no se encuentra registrado en el sistema' });
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '30m' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: mail,
            subject: 'Recuperaci\xF3n de Contrase\xF1a',
            text: `Ha solicitado la recuperaci\xF3n de su cuenta en TaskU!. </ br> Use este enlace para restablecer la contrase\xF1a: http://localhost:3015/api/users/reset-password/${token}`,
        });
    
        res.json({ message: 'Correo de recuperaci\u00F3n enviado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al env\u00EDar el correo ' + error.message });
    }
};

exports.resetPasswordFrontend = async (req, res) => {
    const {  newPassword, token } = req.body;
    try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    const user = await User.findByPk(decoded.id);
    user.pass = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Contrase\u00F1a restablecida' });
    } catch (error) {
    res.status(400).json({ message: 'Token inv\u00E1lido o expirado' + error.message});
    }
} 