const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/sign-up', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('email address already exists!');
                }
            });
        }),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password must be at elast 5 characters'),
    body('username')
        .custom((value, { req }) => {
            return User.findOne({ username: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('username already exists!');
                }
            });
        })
        .trim()
        .not()
        .isEmpty()
], authController.signUp)

router.post('/login', [
    body('username')
        .trim()
        .not()
        .isEmpty(),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password must be at elast 5 characters'),
], authController.login);

module.exports = router;