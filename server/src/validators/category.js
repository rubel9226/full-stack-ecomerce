const { body } = require('express-validator');
 

const validateCategory = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category Name is required.')
        .isLength({ min: 3 })
        .withMessage('Category Name should be at lest 3 characters long'),
];



// sign in validation
module.exports = { validateCategory };