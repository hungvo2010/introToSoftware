const User = require('../models/user');
const Profile = require('../models/profile');
const cloudinary = require('../services/upload').cloudinary;

exports.getProfile = (req, res, next) => {
    const guestUserId = req.params.userId;
    console.log(guestUserId);
    Profile.findByPk(guestUserId)
    .then(profile => {
        if (!profile){
            return res.status(404).json({
                message: 'User not found',
            })
        }
        return res.status(200).json(profile);
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.updateProfile = async (req, res, next) => {
    const image = await cloudinary.uploader.upload(req.file.path);
    const userId = req.user.userId;
    const {name, age, favoriteTask, availableTime} = req.body;
    console.log(req.body);
    Profile.findByPk(userId)
    .then(profile => {
        if (!profile){
            return Profile.create({
                userId,
                name,
                age,
                favoriteTask,
                availableTime,
                avatarUrl: image.secure_url,
            });
        }
        profile.name = name;
        profile.age = age;
        profile.favoriteTask = favoriteTask;
        profile.availableTime = availableTime;
        profile.avatarUrl = req.file.filename;
        return profile.save();
    })
    .then(profile => {
        res.status(204).json({
            message: 'Updated.',
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.changeMode = (req, res, rext) => {
    const userId = req.user.userId;
    const mode = req.body.mode;
    console.log(mode);
    User.findByPk(userId)
    .then(user => {
        user.mode = mode;
        return user.save();
    })
    .then(user => {
        res.status(204).json({
            message: "Changed"
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}