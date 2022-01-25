const Task = require('../models/task');
const crypto = require('crypto');
const cloudinary = require('../services/upload').cloudinary;

exports.createTask = async (req, res, next) => {
    console.log(req.body);
    const image = await cloudinary.uploader.upload(req.file.path);
    const {priority, lat, long, type, deadline, description} = req.body;
    const idReceiver = req.user.userId;
    crypto.randomBytes(5, (err, buffer) => {
        if (err) throw next(err);
        const taskId = buffer.toString('hex');
        Task.create({
            taskId,
            idReceiver,
            priority,
            lat,
            long,
            type,
            deadline,
            description,
            photoUrl: image.secure_url,
        })
        .then(task => {
            res.status(201).json({
                message: "Task created",
                taskId: task.taskId,
            });
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
    })   
}

exports.updateTask = async (req, res, next) => {
    const image = await cloudinary.uploader.upload(req.file.path);
    const {taskId, priority, lat, long, type, deadline, description} = req.body;
    Task.findByPk(taskId)
    .then(task => {
        task.priority = true,
        task.lat = lat;
        task.long = long;
        task.type = type;
        task.deadline = deadline;
        task.description = description;
        task.photoUrl = image.secure_url;
        return task.save();
    })
    .then(task => {
        res.status(204).json({
            message: "Task updated",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

// exports.getConnectionHistory = (req, res, next) => {
//     const userId = req.user.userId;
//     Task.findAll({
//         where: {
//                 $or: [
//                 {
//                     idVolunteer: userId,
//                 },
//                 {
//                     idReceiver: userId,
//                 }
//             ]
//         }
//     })
//     .then(tasks => {
        
//     })
// }

exports.confirmHelp = (req, res, next) => {
    const {taskId} = req.body;
    Task.findByPk(taskId)
    .then(task => {
        task.isFinished = true;
        return task.save();
    })
    .then(task => {
        res.status(204).json({
            message: "Task finished",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
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
        next(err);
    })
}