const createError = require('http-errors'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/find.item');
const deleteImage = require('../helper/delete.image');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL, jwtResetPasswordKey, jwtAccessKey, jwtRefreshKey } = require('../secret');
const emailWithNodeMailer = require('../helper/email');
const { 
    handleUserAction, 
    findUsers, 
    findUserById, 
    deleteUserById, 
    updateUserById, 
    updateUserPasswordById, 
    s, 
    resetPassword 
} = require('../services/user.service');
const checkUserExists = require('../helper/checkUserExists');
const sendEmail = require('../helper/sendEmail');
const cloudinary = require('../config/cloudinary');
const { setRefreshTokenCookie, setAccessTokenCookie } = require('../helper/cookie');

const handleGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 15;


        const { users, pagination } = await findUsers(search, limit, page);

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
        console.log({name, email, password, phone, image});

        const userExists = await checkUserExists(email);
        if(userExists){
            deleteImage(image);
            throw createError(409, 'User with this email already exists')

        };

        // create jwt
        const tokenPayload = { name, email, password, phone, address, } // added new

        if(image){
            tokenPayload.image = image
            console.log(image)
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

            const image = decoded.image;
            console.log('image is: ', image);
            if(image){
                const response = await cloudinary.uploader.upload(image, {
                    folder: 'Trivon_fashion/users'
                });
                console.log('response: ', response);
                decoded.image = response.secure_url;
            }

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

const pendingUsers = new Map();

const handleProcessRegisterCode = async (req, res, next) => {
    try {
        console.log('hi all');
        const { name, email, image: userImage, password, confirm, phone, address } = req.body;
        console.log(userImage, 'user image');

        
        const image = req.file?.path;

        console.log({
            name, 
            email, 
            image,
            password,
            confirm, 
            phone,
        })

        const userExists = await checkUserExists(email);

        if (userExists) {
            if (image) {
                deleteImage(image);
            }

            throw createError(409, "User already exists");
        }

        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        // generate otp
        const otp = generateOTP();

        // store temporarily
        pendingUsers.set(email, {
            name,
            email,
            password,
            phone,
            address,
            image,
            otp,
            createdAt: Date.now(),
        });

        // send email
        const emailData = {
            email,
            subject: "Verify Your Account",
            html: `
                <h2>Hello ${name}</h2>
                <p>Your verification code is:</p>

                <h1>${otp}</h1>

                <p>This code will expire in 10 minutes.</p>
            `,
        };

        await sendEmail(emailData);

        return successResponse(res, {
            statusCode: 200,
            message: "Verification code sent to your email",
            payload: {
                name: name,
                email: email,
                otp: otp
            }
        });

    } catch (error) {
        next(error);
    }
};

const handleVerifyOTP = async (req, res, next) => {
    try {

        const { email, otp } = req.body;

        const pendingUser = pendingUsers.get(email);

        console.log(pendingUser);
        console.log(email);

        if (!pendingUser) {
            throw createError(404, "No pending registration found");
        }

        // check otp
        if (pendingUser.otp !== otp) {
            throw createError(400, "Invalid OTP");
        }

        // check expire time (10 min)
        const isExpired =
            Date.now() - pendingUser.createdAt > 10 * 60 * 1000;

        if (isExpired) {
            pendingUsers.delete(email);
            throw createError(400, "OTP expired");
        }

        let uploadedImage = "";

        if (pendingUser.image) {

            const response = await cloudinary.uploader.upload(
                pendingUser.image,
                {
                    folder: "Trivon_fashion/users",
                }
            );

            uploadedImage = response.secure_url;
        }
        


        // create user
        const newUser = await User.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            phone: pendingUser.phone,
            address: pendingUser.address,
            image: uploadedImage,
        });

        // remove temp data
        pendingUsers.delete(email);

        return successResponse(res, {
            statusCode: 201,
            message: "Registration successful",
            payload: newUser
        });

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
        console.log('before')
        console.log(req.body);
        console.log('after')
        console.log(req.file?.path)

        const updatedUser = await updateUserById( userId, req );

        // new access token
        const accessToken = createJSONWebToken(
            {user: updatedUser},
            jwtAccessKey,
            '15m'
        );
        setAccessTokenCookie(res, accessToken);

        // new refresh token
        const refreshToken = createJSONWebToken(
            { user: updatedUser },
            jwtRefreshKey,
            '7d'
        )
        
        setRefreshTokenCookie(res, refreshToken);

        return successResponse(res, {
            statusCode: 200, 
            message: 'user was updated successfully',
            payload: updatedUser,
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
        let successMessage = '';
        

        const user = await User.findOne({_id: userId});
        if(!user){
            throw createError('user not found.');
        }

        const action = user.isBanned;
        if(action){
            successMessage = 'User was banned successfully.'
        }else{ 
            successMessage = 'User was unbanned successfully';
        }

        
        const updatedUser = await handleUserAction(userId, action) ;  // called handle user action
        if(!updatedUser){
            throw createError(400, `User was not banned successfully`);
        };
        
        return successResponse(res, {
            statusCode: 200, 
            message: successMessage,
            payload: updatedUser,
        });
    } catch (error) { 
        next(error);
    } 
};



const handleUpdatePassword = async (req, res, next) => {
    try {
        // email, oldPassword, newPassword, confirmedPassword 
        const userId = req.user._id;
        const { oldPassword, newPassword, confirmedPassword } = req.body;

        const updatedUser = await updateUserPasswordById(userId, oldPassword, newPassword, confirmedPassword)
        

        return successResponse(res, {
            statusCode: 200, 
            message: "User password was updated successfully",
            payload: {updatedUser},
        });
    } catch (error) {
        next(error);
    } 
};

const forgotPasswordStore = new Map();

const sendForgotPasswordOTP = async (req, res, next) => {
    try {
        // console.log('welcome here.')
        const {email} = req.body;
        console.log(email);

        const user = await User.findOne({ email });

        if (!user) {
            throw createError(404, "User not found");
        }

        // generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // store in memory (production: Redis use better)
        forgotPasswordStore.set(email, {
            otp,
            createdAt: Date.now(),
        });

        // email send
        const emailData = {
            email,
            subject: "Forgot Password OTP",
            html: `
                <div>
                    <h2>Hello ${user?.name}</h2>
                    <p>Your password reset code is:</p>

                    <h1 style="color:#1F5DA0">${otp}</h1>

                    <p>This code will expire in 10 minutes.</p>
                </div>
            `,
        };

        await sendEmail(emailData);

        return successResponse(res, {
            statusCode: 200, 
            message: "OTP sent to email",
            payload: otp
        });

    } catch (error) {
        next(error);
    }
};

const verifyForgotPasswordOTP = async (req, res, next) => {
    try {
        const {email, otp, password, confirm} = req.body;
        const record = forgotPasswordStore.get(email);

        console.log(email, '= email', otp, '= otp', password, '= password', confirm,'= confirm password');
        console.log(record);

        if (!record) {
            throw createError(400, "OTP not found or expired");
        }

        // check expire (10 min)
        const isExpired = Date.now() - record.createdAt > 10 * 60 * 1000;

        if (isExpired) {
            forgotPasswordStore.delete(email);
            throw createError(400, "OTP expired");
        }

        if (record.otp !== otp) {
            throw createError(400, "Invalid OTP");
        }

        if (password !== confirm) {
            throw createError(400, "Password and confirm password does not match.");
        }

        const filter = { email: email };
        const update = { password: password };
        const options = { new: true };
        const updatedUser = await User.findOneAndUpdate(
            filter,
            update,
            options
        ).select('-password');

        // mark verified (allow password reset)
        // forgotPasswordStore.set(email, {
        //     verified: true,
        // });

        return successResponse(res, {
            statusCode: 200, 
            message: "User Reset successfully",
            payload: {updatedUser},
        });

    } catch (error) {
        throw error;
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
    sendForgotPasswordOTP,
    verifyForgotPasswordOTP, 
    handleResetPassword,

    handleProcessRegisterCode, 
    handleVerifyOTP

};