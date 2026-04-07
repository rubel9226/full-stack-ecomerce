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
const uploadUserImage = require('../middlewares/upload');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');




// get api/users
userRouter.post(
    '/process-register', 
    uploadUserImage.single('image'), 
    isLoggedOut, 
    validateUserRegistration,
    runValidation, 
    handleProcessRegister
);

userRouter.post('/activate', isLoggedOut, handleActivateUserAccount);

userRouter.get('/', isLoggedIn, isAdmin, handleGetUsers);

userRouter.post( 
    '/forget-password', 
    validateUserForgetPassword, 
    runValidation, 
    handleForgetPassword 
);

userRouter.put( 
    '/reset-password', 
    validateUserResetPassword, 
    runValidation, 
    handleResetPassword
);


//  all id userRouter
userRouter.get('/:id', isLoggedIn, handleGetUserById);

userRouter.delete('/:id', isLoggedIn, isAdmin, handleDeleteUserById);

userRouter.put('/:id',uploadUserImage.single('image'), isLoggedIn, handleUpdateUserById);

userRouter.put('/manage-user/:id', isLoggedIn, isAdmin, handleManageUserStatusById);

userRouter.put(
    '/update-password/:id', 
    validateUserPasswordUpdate, 
    runValidation, 
    isLoggedIn, 
    handleUpdatePassword
);




module.exports = userRouter;