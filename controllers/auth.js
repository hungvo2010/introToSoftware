const path = require('path');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const Authenticator = require('../models/authenticator');
const User = require('../models/user');
const Token = require('../models/token');
const generateToken = require('../utils/generateToken');

const emailTransporter = require('../utils/emailTransporter');

require('dotenv').config({path: path.join(__dirname, '.env')});

exports.postSignup = (req, res, next) => {
    const {email, password, phoneNumber, mode, address} = req.body;
    Authenticator.findByPk(email)
    .then(auth => {
        if (auth){
            return res.status(409).json({
                error: 'Email already register',
            })
        }
        let uid;
        let hashPassword;
        let authSaved;
        crypto.randomBytes(5, (err, buffer) => {
            console.log(err);
            uid = buffer.toString('hex');
            bcryptjs.hash(password, 12)
            .then(hashedPassword => {
                hashPassword = hashedPassword;
                return Authenticator.create({
                    email,
                    password: hashedPassword,
                })
                .catch(err => {
                    throw next(err);
                });
            })
            .then(auth => {
                authSaved = auth;
                return User.create({
                    userId: uid,
                    email,
                    password: hashPassword,
                    phoneNumber,
                    mode,
                    address,
                })
                .catch(err => {
                    authSaved.destroy();
                    throw next(err);
                });
            })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postSignin = (req, res, next) =>{
    const {email, password} = req.body;
    Authenticator.findByPk(email)
    .then(auth => {
        if (!auth)
        {
            return res.status(401).json({
                error: 'Email not found',
            })
        }
        return bcryptjs.compare(password, auth.password)
        .then(auth => {
            if (!auth)
            {
                return res.status(401).json({
                    error: 'Password wrong.',
                })
            }
            return User.findOne({
                where: {
                    email,
                }
            })
            .then(user => {
                const token = jwt.sign(
                    { userId: user.userId, email},
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }
                );
                user.dataValues.token = token;
                return res.status(200).json(user);
            })
            .catch(err => {
                next(err);
            })
        })
        .catch(err => {
            next(err);
        })
})}


exports.postReset = (req, res, next) => {
    const { email } = req.body;
    Authenticator.findByPk(email)   
    .then(auth => {
        if (!auth)
        {
            return res.status(401).json({
                error: 'Email not found',
            })
        }
        Token.create({
            email,
            token: generateToken(),
            expirationDate: new Date(Date.now() + 300000),
        })
        .then(newToken => {
            console.log(newToken.token);
            const emailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'RESET PASSWORD',
                html: `
                    <p>Hi, copy this token to reset your account's password: <b>${newToken.token}</b></p>
                `
            }
            res.status(200).json({
                message: 'Check your email to get token',
            })
            emailTransporter.sendMail(emailOptions, (err, response) => {
                err ? console.log(err) : console.log(response);
                emailTransporter.close();
            })
        })
        .catch(err => {
            next(err);
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postNewPassword = (req, res, next) => {
    const {email, newPassword, token} = req.body;
    console.log(req.body);
    Token.findOne({
        where: {
            email,
            token,
            expirationDate: {
                [Op.gte]: Date.now(),
            }
        }
    })
    .then(fetchedToken => {
        if (!fetchedToken){
            return res.status(400).json({
                error: 'Token verification failed',
            })
        }
        fetchedToken.destroy();
        bcryptjs.hash(newPassword, 12)
        .then(hashedPassword => {
            return Authenticator.update({
                password: hashedPassword,
            }, 
            {
                where: {email,}
            })
        })
        .then(auth => {
            res.status(200).json(auth);
        })
        .catch(err => {
            next(err);
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postUpdatePassword = (req, res, next) => {
    const {email, oldPassword, newPassword} = req.body;
    Authenticator.findByPk(email)
    .then(auth => {
        bcryptjs.compare(oldPassword, auth.password)
        .then(result => {
            if (!result){
                return res.status(400).json({
                    error: 'Password wrong.',
                })
            }
            bcryptjs.hash(newPassword, 12)
            .then(hashedPassword => {
                auth.password = hashedPassword;
                return auth.save();
            })
            .then(auth => {
                res.status(200).json(auth);
            })
            .catch(err => {
                next(err);
            })
        })
        .catch(err => {
            next(err);
        })
    })
    .catch(err => {
        next(err);
    })
}