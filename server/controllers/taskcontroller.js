const taskdetails = require('../models/task-details');

createTask = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task details',
        })
    }

    const taskInfo = new taskdetails(body);
    if (!taskInfo) {
        return res.status(400).json({ success: false, error: err })
    }
    taskInfo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: taskInfo._id,
                message: 'New Task created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'New Task not created!',
            })
        })
}

getTaskById = async (req, res) => {
    await taskdetails.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}
updateTaskById = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide details to update',
        })
    }

    taskdetails.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Task not found!',
            })
        }
        task.name = body.name
        task.assignedTo = body.assignedTo
        task.username = body.username
        task
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: task._id,
                    message: 'Task updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Task not updated!',
                })
            })
    })
}


getTaskDetails = async (req, res) => {
    await taskdetails.find({}, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!result.length) {
            return res
                .status(404)
                .json({ success: false, error: `Tasks not found` })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => console.log(err))
}

deleteTaskById = async (req, res) => {
    await taskdetails.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `task not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

module.exports = {
    createTask,
    getTaskDetails,
    getTaskById,
    updateTaskById,
    deleteTaskById
}