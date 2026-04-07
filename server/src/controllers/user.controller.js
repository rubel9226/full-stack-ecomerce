const createError = require('http-errors'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/find.item');
const deleteImage = require('../helper/delete.image');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL, jwtResetPasswordKey } = require('../secret');
const emailWithNodeMailer = require('../helper/email');
const { handleUserAction, findUsers, findUserById, deleteUserById, updateUserById, updateUserPasswordById, forgetPasswordEmail, resetPassword } = require('../services/user.service');
const checkUserExists = require('../helper/checkUserExists');
const sendEmail = require('../helper/sendEmail');


const handleGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 15;


        const { users, pagination } = await findUsers(search, limit, page)

        return successResponse(res, {
            statusCode: 200, 
            message: 'user profile is return successfully',
            payload: {
                users,
                pagination,
            },
        })
    } catch (error) {
        next(error);
    }
    
};



const handleGetUserById = async (req, res, next) => {
    try {

        console.log('This is getUserById')
        
        const id = req.params.id;
        const options = { password: 0 };
        const user = await findUserById(id, options); // called find.user


        return successResponse(res, {
            statusCode: 200, 
            message: 'user was return successfully',
            payload: {user}
        });

    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400, 'Invalid user id'));
        }
        next(error);
        
    } 
};



const handleProcessRegister = async (req, res, next) => {
    try {
        const {name, email, password, phone, address} = req.body;
        
        // add new
        const image = req.file?.path;
        if(image && image.size > 1024 * 1024 * 2){
            throw createError(400, 'File too large. It must be less then 2 MB')
        }

        const userExists = await checkUserExists(email);
        if(userExists){
            deleteImage(image);
            throw createError(409, 'User with this email already exists')

        };

        // create jwt
        const tokenPayload = { name, email, password, phone, address, } // added new

        if(image){
            tokenPayload.image = image
        }
        const token =  createJSONWebToken(
            tokenPayload,
            jwtActivationKey, 
            '10m'
        );

        // prepare email
        const emailData = {
            email, 
            subject: 'Account Activation Email',
            html: `
                <h2> Hello ${name} !</h2>
                <p>Please click hera to link <a href="${clientURL}/api/users/activate/${token}" target="_blank"> activate your account</a></p>
            
            `
        }

        // send email with nodemailer
        await sendEmail(emailData);
        
        return successResponse(res, {
            statusCode: 200, 
            message: `Please go to your ${email} for completing your registration process`,
            payload: { token }
        });
    } catch (error) {
        next(error);
       
    } 
};



const handleActivateUserAccount = async (req, res, next) => {
    try {
        const token = req.body.token
        if(!token) throw createError(401, 'token not found');

        try {
            const decoded = jwt.verify(token, jwtActivationKey);
            if(!decoded) throw createError(401, 'Unable to verify user');

            const userExists = await User.exists({email: decoded.email});
            if(userExists){
                throw createError(409, 'User with this email already exists. Please sign in.')
            };
            await User.create(decoded);

            return successResponse(res, {
                statusCode: 200, 
                message: `user was registered successfully`,
            });
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                throw createError(401, 'Token has expired');
            }else if (error.name === 'JsonWebTokenError'){
               throw createError(401, "invalid Token");
            }else{
                throw error;
            }
        }
        
    } catch (error) {
        next(error);
       
    } 
};



const handleDeleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        await deleteUserById(id, options); // called find.user



        // const userImagePath = user.image;
        // deleteImage(userImagePath); // called deleteImage function
        
        
        
        return successResponse(res, {
            statusCode: 200, 
            message: 'user was deleted successfully',
        });
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400, 'Invalid user id'));
        }
        next(error); 
    } 
};



const handleUpdateUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const updatedUser = await updateUserById( userId, req );

        console.log(updatedUser);
        
        return successResponse(res, {
            statusCode: 200, 
            message: 'user was updated successfully',
            payload: {updatedUser},
        });
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400, 'Invalid user id'));
        }
        next(error); 
    } 
};



const handleManageUserStatusById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const action = req.body.action;
        
        
        const successMessage = await handleUserAction(userId, action) ;  // called handle user action

        // const userId = req.params.id;

        // //  ! find the user 
        // const user = await findWithId(User, userId);
        // const isBanned = user.isBanned;
        // const newUpdates = !isBanned;
        // const updates = { isBanned: newUpdates };
        // const updateOptions = {
        //     new: true, 
        //     runValidators: true, 
        //     context: 'query' 
        // };
        
        // const updatedUser = await User.findByIdAndUpdate(
        //     userId, 
        //     updates,
        //     updateOptions
        // ).select('-password');

        // if(!updatedUser){
        //     throw createError(400, `User was not ${user.isBanned ? 'Unbanned' : 'Banned'} successfully`);
        // };
        
        



        
        return successResponse(res, {
            statusCode: 200, 
            // message: `user was ${user.isBanned ? 'Unbanned' : 'Banned'} successfully`,
            message: successMessage,
            payload: {},
        });
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400, 'Invalid user id'));
        }
        next(error);
    } 
};



const handleUpdatePassword = async (req, res, next) => {
    try {
        // email, oldPassword, newPassword, confirmedPassword 
        const { email, oldPassword, newPassword, confirmedPassword } = req.body;
        const userId = req.params.id;

        const updatedUser = await updateUserPasswordById(userId, email, oldPassword, newPassword, confirmedPassword)
        

        return successResponse(res, {
            statusCode: 200, 
            message: "User password was updated successfully",
            payload: {updatedUser},
        });
    } catch (error) {
        next(error);
    } 
};



const handleForgetPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        
        const token = await forgetPasswordEmail(email);

        return successResponse(res, {
            statusCode: 200, 
            message: `Please go to your ${email} for resetting the password`,
            payload: { token }
        });
    } catch (error) {
        next(error);
    } 
};



const handleResetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        
        const updatedUser = await resetPassword(token, password);

        return successResponse(res, {
            statusCode: 200, 
            message: "User Reset successfully",
            payload: {updatedUser},
        });
    } catch (error) {
        next(error);
    } 
};



module.exports = { 
    handleGetUsers, 
    handleGetUserById, 
    handleDeleteUserById, 
    handleProcessRegister, 
    handleActivateUserAccount,
    handleUpdateUserById,
    handleManageUserStatusById,
    handleUpdatePassword,
    handleForgetPassword,
    handleResetPassword
};