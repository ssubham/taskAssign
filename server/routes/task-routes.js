const express = require('express')

const taskCtrl = require('../controllers/taskcontroller');

const router = express.Router()

router.post('/tasks', taskCtrl.createTask)
router.get('/task/:id', taskCtrl.getTaskById)
router.get('/tasks', taskCtrl.getTaskDetails)
router.put('/task/:id', taskCtrl.updateTaskById)
router.delete('/task/:id', taskCtrl.deleteTaskById)

module.exports = router