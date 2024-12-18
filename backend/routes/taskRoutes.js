const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
    
router.post('/create-task', taskController.addTask);
// Todo lo que conlleve actualizaciones y obtención de información de la base de datos requiere
// el uso de middleware.
// router.get('/filter-task', authMiddleware, taskController.filterTask);
router.get('/status/:statusTask', authMiddleware, taskController.filterTask);
router.delete('/delete-task/:id', authMiddleware, taskController.deleteTask);
router.put('/update-task/:id', authMiddleware, taskController.updateTask);
// router.post('/modify-state', authMiddleware, taskController.modifyState);
// router.post('/modify-task', authMiddleware, taskController.modifyTask);

module.exports = router;
