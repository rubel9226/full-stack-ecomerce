const createError = require('http-errors'); 
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/find.item');
const deleteImage = require('../helper/delete.image');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const emailWithNodeMailer = require('../helper/email');


const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

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


        if(users.length === 0) throw createError(404, 'no Users found');


        return successResponse(res, {
            statusCode: 200, 
            message: 'user profile is return successfully',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit), 
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        })
    } catch (error) {
        next(error);
    }
    
};



const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {password: 0};
        const user = await findWithId(User, id, options); // called find.user

        return successResponse(res, {
            statusCode: 200, 
            message: 'user was return successfully',
            payload: {user}
        });
    } catch (error) {
        next(error);
    } 
};



const processRegister = async (req, res, next) => {
    try {
        const {name, email, password, phone, address} = req.body;
        
        const userExists = await User.exists({email: email});
        if(userExists){
            throw createError(409, 'User with this email already exists')
        };

        // create jwt
        const token =  createJSONWebToken(
            {name, email, password, phone, address}, 
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
        try {
            await emailWithNodeMailer(emailData);
        } catch (emailError) {
            console.error('EMAIL ERROR: ', emailError)
            next(emailError)
            return;
        }
        
        const newUser = {
            name, 
            email, 
            password, 
            phone, 
            address
        }

        return successResponse(res, {
            statusCode: 200, 
            message: `Please go to your ${email} for completing your registration process`,
            payload: { token }
        });
    } catch (error) {
        next(error);
       
    } 
};



const activateUserAccount = async (req, res, next) => {
    try {
        const token = req.body.token
        if(!token) throw createError(404, 'token not found');

        const decoded = jwt.verify(token, jwtActivationKey);

        // await User.create(decoded);

        console.log(decoded);
        return successResponse(res, {
            statusCode: 200, 
            message: `user was registered successfully`,
            payload: { token }
        });
    } catch (error) {
        // next(error);
        console.log('rumi ke bokachoda')
       
    } 
};



const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {password: 0};

        const user = await findWithId(User, id, options); // called find.user


        const userImagePath = user.image;
        deleteImage(userImagePath); // called deleteImage function
        
        await User.findByIdAndDelete({_id: id, isAdmin: false})

        
        return successResponse(res, {
            statusCode: 200, 
            message: 'user was deleted successfully',
        });
    } catch (error) {
        next(error);
       
    } 
};

module.exports = { getUsers, 
    getUserById, 
    deleteUserById, 
    processRegister, 
    activateUserAccount 
}