const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");




const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            throw createError(401, 'Access token not found. Please login')
        };
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if(!decoded){
            throw createError(401, 'Invalid access token. Please login again.');
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        return next(error)
    }
};


const isLoggedOut = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            try {
                const decoded = jwt.verify(accessToken, jwtAccessKey);
                if(decoded){
                    throw createError(401, 'User is already logged in')
                }
            } catch (error) {
                throw error;
            }
        };
    
        next();
    } catch (error) {
        return next(error)
    }
};

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken // cookie name math korte  hobe.

        if(!accessToken){
            return res.status(401).json({message: "Unauthorized"})
        }
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        
        req.user = decoded.user;
        // console.log(decoded.user)
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token'})
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role != 'admin'){
            throw createError(403, 'Forbidden. You must be an admin to access this resource');
        }
        next();
    } catch (error) {
        return next(error)
    }
};


module.exports = { isLoggedIn, isLoggedOut, isAdmin, verifyToken }