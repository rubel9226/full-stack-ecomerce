const {
    body
} = require('express-validator');

// registration validation
const validateUserRegistration = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required. Enter your full name')
        .isLength({ min: 3, max: 31 })
        .withMessage('Name should be at lest 3-31 characters long'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required, Enter your email address.')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required. Enter your password')
        .isLength({min: 6})
        .withMessage('password should be at lest 6 characters long'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required. Enter your address')
        .isLength({min: 3})
        .withMessage('address should be at lest 6 characters long'),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required. Enter your phone number'),
    body('image')
        .optional()
        .isString()
        .withMessage('User image is optional'),
    // body('image')
    //     .custom((value, {req}) => {
    //         if(!req.file || !req.file.buffer){
    //             throw new Error('User image is required');
    //         }
    //         return true;
    //     })
    //     .withMessage('User image is required'),
];


// registration validation
const validateUserLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required, Enter your email address.')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required. Enter your password')
        .isLength({min: 6})
        .withMessage('password should be at lest 6 characters long'),
];



// registration validation
const validateUserForgetPassword = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required, Enter your email address.')
        .isEmail()
        .withMessage('Invalid email address'),
];



// registration validation
const validateUserResetPassword = [
    body('token')
        .trim()
        .notEmpty()
        .withMessage('Token is missing'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('new Password is required. Enter your password')
        .isLength({min: 6})
        .withMessage('new Password should be at lest 6 characters long'),
];



// update password password validation
const validateUserPasswordUpdate = [
    // body('email')
    //     .trim()
    //     .notEmpty()
    //     .withMessage('Email is required, Enter your email address.')
    //     .isEmail()
    //     .withMessage('Invalid email address'),
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('new Password is required. Enter your password')
        .isLength({min: 6})
        .withMessage('new Password should be at lest 6 characters long'),
    body('confirmedPassword').custom((value, {req}) => {
         if(value !== req.body.newPassword){
             throw new Error('password did not match')
         }
         return true;
     })
];



// sign in validation
module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserPasswordUpdate,
    validateUserForgetPassword,
    validateUserResetPassword,
    
};