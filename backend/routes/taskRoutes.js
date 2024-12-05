const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
    
router.post('/create', taskController.addTask);
// Todo lo que conlleve actualizaciones y obtenci�n de informaci�n de la base de datos requiere
// el uso de middleware.
router.get('/filterTask', authMiddleware, taskController.filterTask);
router.post('/modifyState', authMiddleware, taskController.modifyState);
router.post('/modifyTask', authMiddleware, taskController.modifyTask);

// router.post('/change-password', authMiddleware, userController.changePassword);
// router.put('/update-profile', authMiddleware, userController.updateProfile);
    
module.exports = router;
