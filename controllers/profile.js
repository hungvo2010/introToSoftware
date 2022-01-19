const User = require('../models/user');
const Profile = require('../models/profile');

exports.getProfile = (req, res, next) => {
    const guestUserId = req.params.userId;
    User.findByPk(guestUserId)
    .then(user => {
        if (!user){
            return res.status(404).json({
                error: 'User not found',
            })
        }
        return res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.updateProfile = (req, res, next) => {
    const userId = req.user.userId;
    const {name, age, favoriteTask, availableTime, avatarUrl} = req.body;
    Profile.findByPk(userId)
    .then(profile => {
        profile.name = name;
        profile.age = age;
        profile.favoriteTask = favoriteTask;
        profile.availableTime = availableTime;
        profile.avatarUrl = avatarUrl;
        return profile.save();
    })
    .then(profile => {
        res.status(204).json(profile);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.changeMode = (req, res, rext) => {
    const userId = req.user.userId;
    const mode = req.body.mode;
    User.findByPk(userId)
    .then(user => {
        user.mode = mode;
        return user.save();
    })
    .then(user => {
        res.status(204).json(user);
    })
    .catch(err => {
        console.log(err);
    })
}