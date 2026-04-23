const createError = require("http-errors");
const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { successResponse } = require("../controllers/response.controller");
const User = require("../models/user.model");
const { findWithId } = require("./find.item");
const deleteImage = require("../helper/delete.image");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtResetPasswordKey, clientURL } = require("../secret");
const emailWithNodeMailer = require("../helper/email");
const sendEmail = require("../helper/sendEmail");
const { publicIdWithoutExtensionFromUrl } = require("../helper/cloudinary.helper");
const cloudinary = require("../config/cloudinary");



const findUsers = async (search, limit, page) => {
    try {
        const searchRegExp = new RegExp('.*' + search + '.*', 'i')
        const filter = {
            isAdmin: {$ne: true},
            $or: [
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {phone: {$regex: searchRegExp}},
            ]
        };
        const options = {password: 0};


        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();


        if(!users || users.length === 0) throw createError(404, 'no Users found');

        return {
            users,
            pagination: {
                totalPages: Math.ceil(count / limit), 
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            }
        }


    } catch (error) {
        throw error;
    }
}


const findUserById = async(id ,options={}) => {
    try {

        const user = await findWithId(User, id, options); // called find.user
        if(!user) throw createError(404, 'User not found');
        
        return user;

    } catch (error) {
        throw (error);
    } 
}


const deleteUserById = async(id, options={}) => {
    try {
        console.log('this is deleteUserById route.')
        const existingUser = await User.findOne({
            _id: id, 
        });

        if( existingUser && existingUser.image){
            // await deleteImage(existingUser.image);
            const publicId = await publicIdWithoutExtensionFromUrl(existingUser.image);
            console.log('this is image delete route.')
            const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/users/${publicId}`);

            if(result !== 'ok'){
                throw createError(404, 'User image was not deleted successfully from cloudinary. Please try again');
            }
        }
        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        })


    } catch (error) {
        if(error instanceof mongoose.Error){
            throw (createError(400, 'Invalid item id'));
        }
        throw (error);
    } 
}


const updateUserById = async( userId, req ) => {
    try {

        const options = { password: 0 };
        const user = await findUserById(userId, options);
        console.log('user', user)
        
        const updateOptions = { returnDocument: 'after', runValidators: true, context: 'query' };
        let updates ={};

        // name, email, password, phone, image, address
        const allowedFields = ['name', 'password', 'phone', 'address'];
        for(const key in req.body){
            if( allowedFields.includes(key) ){
                updates[key] = req.body[key];
            }else if(key === 'email'){
                throw createError(400, 'Email can not be updated');
            }
        }


        
        const image = req.file?.path;
        if(image){
            if(image.size > 7152){
                throw createError(400, 'File too large. it must be less than 2 MB');
            }
            const response = await cloudinary.uploader.upload(image, {
                folder: 'Trivon_fashion/users'
            });
            updates.image = response.secure_url;
            console.log('response: ', response.secure_url);
        }

        // // delete updates.email;

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updates, 
            updateOptions
        ).select('-password');

        if(!updatedUser){
            throw createError(400, 'User with this ID does not exist');
        };
        console.log('image found ?')
        console.log(image)
        if(image){
            console.log('image', image)
            if(user.image){
                // await deleteImage(existingUser.image);
                const publicId = await publicIdWithoutExtensionFromUrl(user.image);
                console.log('this is image delete route.')
                const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/users/${publicId}`);
    
                if(result !== 'ok'){
                    throw createError(404, 'User image was not deleted successfully from cloudinary. Please try again');
                }
            }
        }
        console.log('image not found')
        return updatedUser;
    } catch (error) {
        throw (error);
    } 
}


const updateUserPasswordById = async( userId, email, oldPassword, newPassword, confirmedPassword ) => {
    try {

        const user = await User.findOne({email: email});

        if(!user){
            throw createError(400, 'User was not found this email.');
        }

        if(newPassword !== confirmedPassword ){
            throw createError(400, 'new password and confirmed did not match');
        }



        // compare the password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        console.log(isPasswordMatch)
        if(!isPasswordMatch){
            throw createError(400, 'Old Password did not match');
        }

        const filter = { userId };
        const updates = { $set: {password: newPassword} };
        const updateOptions = {new: true};

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {password: newPassword},
            {new: true},
        ).select('-password')
        
        if(!updatedUser){
            throw createError(400, 'User was not updated.');
        }
        
        return updatedUser;
    } catch (error) {
        throw (error);
    } 
}


const forgetPasswordEmail = async( email ) => {
    
    try {

        const user = await User.findOne({email: email});
        if(!user){
            throw createError(404, 'Email is incorrect or you have not verified your email address. Please register yourself first');
        }

        // create jwt
        const token =  createJSONWebToken(
            { email },
            jwtResetPasswordKey, 
            '10m'
        );

        // prepare email
        const emailData = {
            email, 
            subject: 'Reset password Email',
            html: `
                <h2> Hello ${user.name} !</h2>
                <p>Please click hera to link 
                    <a href="${clientURL}/api/users/reset-password/${token}" 
                        target="_blank"> 
                        Reset your password
                    </a>
                </p>
            `
        }
        // send email with nodemailer
        await sendEmail(emailData);

        return token;
    } catch (error) {
        throw (error);
    } 
}


const resetPassword = async( token, password ) => {
    
    try {
        const decoded = jwt.verify(token, jwtResetPasswordKey);

        if(!decoded){
            throw createError(400, 'Invalid or expired token');
        }
        
        const filter = { email: decoded.email };
        const update = { password: password };
        const options = { new: true };
        const updatedUser = await User.findOneAndUpdate(
            filter,
            update,
            options
        ).select('-password');

        if(!updatedUser){
            throw createError(400, 'Password reset failed.'); 
        }
        return updatedUser;
    } catch (error) {
        throw (error);
    } 
}


const handleUserAction = async (userId, action) => {
    try {
        let update;
        let successMessage;
        if(action === 'ban'){
            update = { isBanned: true };
            successMessage = 'User was banned successfully.'
        }else if(action === 'unban'){
            update = { isBanned: false };
            successMessage = 'User was unbanned successfully';
        }else{
            throw createError(400, 'Invalid action. Use "ban" or "unban" ');
        }
        
        const updateOptions = {
            new: true, 
            runValidators: true, 
            context: 'query' 
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            update,
            updateOptions
        ).select('-password');

        if(!updatedUser){
            throw createError(400, `User was not banned successfully`);
        };

        return successMessage;
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400, 'Invalid user id'));
        }
        throw (error)
    }
}







module.exports = { 
    findUsers, 
    findUserById,
    deleteUserById,
    updateUserById,
    updateUserPasswordById,
    handleUserAction, 
    forgetPasswordEmail,
    resetPassword
}