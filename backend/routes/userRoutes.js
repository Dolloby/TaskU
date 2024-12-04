const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
    
router.post('/register', userController.register);
router.post('/login', userController.login);
// Todo lo que conlleve actualizaciones y obtención de información de la base de datos requiere
// el uso de middleware.
router.get('/profile', authMiddleware, userController.getUser);
router.post('/change-password', authMiddleware, userController.changePassword);
router.put('/update-profile', authMiddleware, userController.updateProfile);
    
module.exports = router;

