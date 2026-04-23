const { body } = require('express-validator');
 

const validateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product Name is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Product Name should be at lest 3-150 characters long'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min: 3 })
        .withMessage('Description Name should be at lest 3-150 characters long'),
    body('price')
        .trim()
        .notEmpty()
        .withMessage('Price is required.')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number.'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required.'),
    body('quantity')
        .trim()
        .notEmpty()
        .withMessage('Quantity is required.')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer.')

];



// sign in validation
module.exports = { validateProduct };