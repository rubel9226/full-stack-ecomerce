const createError = require('http-errors'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtAccessKey, jwtRefreshKey } = require('../secret');
const { setAccessTokenCookie, setRefreshTokenCookie } = require('../helper/cookie');



const handleLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // isExist
        const user = await User.findOne({email});
        if(!user){
            throw createError(404, 'User does not exist with this email. Please register first')
        }

        // compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            throw createError(401, 'Email/password is not match');
            
        }

        // isBanned
        if(user.isBanned){
            throw createError(403, 'You are Banned. Please contact Admin');
            
        }

        // token , cookie
        // create jwt
        const accessToken =  createJSONWebToken({ user }, jwtAccessKey, '15m');
        setAccessTokenCookie(res, accessToken); // set access cookie
        

        // token , cookie
        // create jwt
        const refreshToken =  createJSONWebToken({ user }, jwtRefreshKey, '7d');
        setRefreshTokenCookie(res, refreshToken); // set refresh cookie
        
        // password without password
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        
        // success response
        return successResponse(res, {
            statusCode: 200, 
            message: 'User logged in successfully',
            payload: { userWithoutPassword },
        })
    } catch (error) {
        next(error)
    }
}



const handleLoginMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        console.log(user);
        return successResponse(res, {
            statusCode: 200, 
            message: 'User fetched successfully',
            payload: {user},
        })
    } catch (error) {
        next(error)
    }
}



const handleLogout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken')

        // success response
        return successResponse(res, {
            statusCode: 200, 
            message: 'User logged out successfully',
            payload: {  },
        })
    } catch (error) {
        next(error)
    }
}



const handleRefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        // verify the old refresh token
        const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
        if(!decodedToken){
            throw createError(401, 'Invalid refresh token. Please login again');
        }
        
        const user = decodedToken.user;
        // create access token
        const accessToken = createJSONWebToken(
            { user }, 
            jwtAccessKey, 
            '15m'
        );
        // set access token on cookie
        setAccessTokenCookie(res, accessToken)

        req.user = decodedToken.user;
        // success response
        return successResponse(res, {
            statusCode: 200, 
            message: 'new access token is genareted',
            payload: {  },
        })
    } catch (error) {
        next(error)
    }
}



const handleProtectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        // verify the old refresh token
        const decodedToken = jwt.verify(accessToken, jwtAccessKey);

        if(!decodedToken){
            throw createError(401, 'Invalid refresh token. Please login again');
        }        
        

        // success response
        return successResponse(res, {
            statusCode: 200, 
            message: 'Protected resources accessed successfully',
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleLogin, 
    handleLogout, 
    handleRefreshToken,
    handleProtectedRoute,
    handleLoginMe
}