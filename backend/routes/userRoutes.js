const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
    
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
// router.post('/reset-password/:token', userController.resetPassword);
router.post('/reset-password', userController.resetPasswordFrontend);
// Todo lo que conlleve actualizaciones y obtención de información de la base de datos requiere
// el uso de middleware.
router.post('/change-password', authMiddleware, userController.changePassword);
router.get('/profile', authMiddleware, userController.getUser);
router.put('/update-profile', authMiddleware, userController.updateProfile);


module.exports = router;

