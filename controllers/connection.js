const Chat = require("../models/chat");
const Report = require('../models/report');
const Feedback = require('../models/feedback');
const Task = require("../models/task");
const Offer = require("../models/offer");

exports.reportUser = (req, res, next) => {
    const reportUserId = req.user.userId;
    const {reportId, beReportedUserId, description} = req.body;
    console.log(req.body);
    Report.create({
        reportId,
        userId: reportUserId,
        description,
        reportUserId: beReportedUserId,
    })
    .then(report => {
        res.status(201).json({
            message: "Task updated",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.getReports = (req, res, next) => {
    const reportUserId = req.user.userId;
    Report.findAll({
        where: {
            userId: reportUserId,
        }
    })
    .then(reports => {
        res.status(200).json(reports);
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.offerHelp = (req, res, next) => {
    const {taskId} = req.body;
    const volunteerId = req.user.userId;
    Offer.create({
        idTask: taskId,
        volunteerId,
    })
    .then(offer => {
        res.status(204).json({
            message: "Offered",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.postNewMessage = (req, res, next) => {
    const user1 = req.user.userId;
    const {user2, message} = req.body;
    Chat.create({
        user1,
        user2,
        message,
    })
    .then(chat => {
        res.status(201).json({
            message: "Send",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.getMessage = (req, res, next) => {
    const user1 = req.user.userId;
    const {user2, message} = req.body;
    Chat.findAll({
        limit: 100,
        order: [
            ['time', 'DESC']
        ]
    })
    .then(chats => {
        res.status(200).json(chats);
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.postFeedback = (req, res, next) => {
    const userId = req.user.userId;
    const {feedbackId, description} = req.body;
    console.log(req.body);
    Feedback.create({
        feedbackId,
        userId,
        description,
    })
    .then(feedback => {
        res.status(201).json({
            message: "Feedback",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.updateFeedback = (req, res, next) => {
    const {feedbackId, description} = req.body;
    console.log(req.body);
    Feedback.findByPk(feedbackId)
    .then(feedback => {
        feedback.description = description;
        return feedback.save();
    })
    .then(feedback => {
        res.status(204).json({
            message: "Feedback",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.agreeHelp = (req, res, next) => {
    const {taskId, volunteerId} = req.body;
    console.log(req.body);
    Task.findByPk(taskId)
    .then(task => {
        task.idVolunteer = volunteerId;
        return task.save();
    })
    .then(task => {
        res.status(204).json({
            message: "Agreed",
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}