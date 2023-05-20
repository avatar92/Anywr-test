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

    bcrypt.hash(password,10).then(hash=>{
        const user = new User({
            username: username,
            password: password,
            email: email,
        })
        return user.save();
    }).then(user=>{
        res.status(201).json({message: 'User created!', userId: user._id})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}


exports.login = (req, res, next) => {
    res.status(200).json({
        msg: 'welcome to login gate',
    })
}

