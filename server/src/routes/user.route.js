const express = require('express');
const userRouter = express.Router();

const { 
    handleGetUsers, 
    handleGetUserById, 
    handleProcessRegister, 
    handleActivateUserAccount, 
    handleUpdateUserById, 
    handleManageUserStatusById, 
    handleDeleteUserById,
    handleUpdatePassword,
    handleForgetPassword,
    handleResetPassword
} = require('../controllers/user.controller');
const { validateUserRegistration, validateUserPasswordUpdate, validateUserForgetPassword, validateUserResetPassword } = require('../validators/auth');
const runValidation = require('../validators');
const {uploadUserImage} = require('../middlewares/upload');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');




// post api/users
userRouter.post(
    '/process-register', 
    uploadUserImage.single('image'), 
    isLoggedOut, 
    validateUserRegistration,
    runValidation, 
    handleProcessRegister
);

// get api/users/activate
userRouter.post('/activate', isLoggedOut, handleActivateUserAccount);

// get api/users
userRouter.get('/', isLoggedIn, isAdmin, handleGetUsers);

// post api/users/forget-password
userRouter.post( 
    '/forget-password', 
    validateUserForgetPassword, 
    runValidation, 
    handleForgetPassword 
);

// put api/users/reset-password
userRouter.put( 
    '/reset-password', 
    validateUserResetPassword, 
    runValidation, 
    handleResetPassword
);


// get api/users/:id
userRouter.get('/:id', isLoggedIn, handleGetUserById);

// delete api/users/:id
userRouter.delete('/:id', isLoggedIn, isAdmin, handleDeleteUserById);

// put api/users/:id
userRouter.put('/:id',uploadUserImage.single('image'), isLoggedIn, handleUpdateUserById);

// put api/users/manage-user/:id
userRouter.put('/manage-user/:id', isLoggedIn, isAdmin, handleManageUserStatusById);

// get api/users/update-password/:id
userRouter.put(
    '/update-password/:id', 
    validateUserPasswordUpdate, 
    runValidation, 
    isLoggedIn, 
    handleUpdatePassword
);




module.exports = userRouter;