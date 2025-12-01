const express = require('express');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id/complete', taskController.completeTask);

module.exports = router;
