require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:2707/tuhin_ecommerce';

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png';

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'ahahihaighaigag_28y145dshd';

// SMTP setup
const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const clientURL = process.env.CLIENT_URL


module.exports = { 
    serverPort, 
    mongodbURL, 
    defaultImagePath, 
    jwtActivationKey, 
    smtpUserName, 
    smtpPassword,
    clientURL,
 }