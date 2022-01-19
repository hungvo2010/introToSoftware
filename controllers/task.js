const Task = require('../models/task');

exports.createTask = (req, res, next) => {
    const {taskId, priority, lat, long, type, deadline, description} = req.body;
    const idReceiver = req.user.userId;
    Task.create({
        taskId,
        idReceiver,
        priority,
        lat,
        long,
        type,
        deadline,
        description,
    })
    .then(task => {
        res.status(201).json(task);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.updateTask = (req, res, next) => {
    const {taskId, priority, lat, long, type, deadline, description} = req.body;
    Task.findByPk(taskId)
    .then(task => {
        task.priority = true,
        task.lat = lat;
        task.long = long;
        task.type = type;
        task.deadline = deadline;
        task.description = description;
        return task.save();
    })
    .then(task => {
        res.status(201).json(task);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getConnectionHistory = (req, res, next) => {
    const userId = req.user.userId;
    Task.findAll({
        where: {
                $or: [
                {
                    idVolunteer: userId,
                },
                {
                    idReceiver: userId,
                }
            ]
        }
    })
    .then(tasks => {
        
    })
}

exports.confirmHelp = (req, res, next) => {
    const {taskId} = req.body;
    Task.findByPk(taskId)
    .then(task => {
        task.isFinished = true;
        return task.save();
    })
    .then(task => {
        res.status(204).json(task);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.filterTask = (req, res, next) => {
    const { fPriority, fLat, fLong, fType, fDeadline} = req.body;
    Task.findAll({
        where: {
            priority: {
                [Op.lte]: fPriority + 10,
                [Op.gte]: fPriority - 10,
            },
            lat: {
                [Op.lte]: fLat + 5,
                [Op.gte]: fLat - 5,
            },
            long: {
                [Op.lte]: fLong + 5,
                [Op.gte]: fLong - 5,
            },
            type: fType,
            deadline: {
                [Op.lte]: fDeadline,
            }
        }
    })
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(err => {
        console.log(err);
    })
}