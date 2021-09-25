const express = require('express')

const taskCtrl = require('../controllers/taskcontroller');

const router = express.Router()

router.post('/tasks', taskCtrl.createTask)
router.get('/tasks/:id', taskCtrl.getTaskById)
router.get('/tasks', taskCtrl.getTaskDetails)
router.put('/tasks/:id', taskCtrl.updateTaskById)
router.delete('/tasks/:id', taskCtrl.deleteTaskById)

module.exports = router