const Chat = require("../models/chat");
const Report = require('../models/report');
const Feedback = require('../models/feedback');
const Task = require("../models/task");
const Offer = require("../models/offer");

exports.reportUser = (req, res, next) => {
    const reportUserId = req.user.userId;
    const {reportId, beReportedUserId, description} = req.body;
    Report.create({
        reportId,
        userId: reportUserId,
        description,
        reportUserId: beReportedUserId,
    })
    .then(report => {
        res.status(201).json(report);
    })
    .catch(err => {
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
        res.status(201).json(reports);
    })
    .catch(err => {
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
        res.status(201).json(offer);
    })
    .catch(err => {
        console.log(err);
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
        res.status(201).json(chat);
    })
    .catch(err => {
        console.log(err);
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
    })
}

exports.postFeedback = (req, res, next) => {
    const userId = req.user.userId;
    const {feedbackId, description} = req.body;
    Feedback.create({
        feedbackId,
        userId,
        description,
    })
    .then(feedback => {
        res.status(201).json(feedback);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.updateFeedback = (req, res, next) => {
    const {feedbackId, description} = req.body;
    Feedback.findByPk(feedbackId)
    .then(feedback => {
        feedback.description = description;
        return feedback.save();
    })
    .then(feedback => {
        res.status(201).json(feedback);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.agreeHelp = (req, res, next) => {
    const {taskId, volunteerId} = req.body;
    Task.findByPk(taskId)
    .then(task => {
        task.idVolunteer = volunteerId;
        return task.save();
    })
    .then(task => {
        res.status(201).json(task);
    })
    .catch(err => {
        console.log(err);
    })
}