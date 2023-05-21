const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, 10).then(hash => {
        const user = new User({
            username: username,
            password: hash,
            email: email,
        })
        return user.save();
    }).then(user => {
        res.status(201).json({ message: 'User created!', userId: user._id })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const username = req.body.username;
    const password = req.body.password;

    let loadedUser;
    User.findOne({ username: username }).then(user => {
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            username: username,
            userId: loadedUser._id.toString(),
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            }
        )

        res.status(200).json({
            token: token
        })
    }).catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

