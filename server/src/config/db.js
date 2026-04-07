const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');
const logger = require('../controllers/logger.controller');


// option 1
const connectDatabase = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options)
        logger.info( 'Connection to DB is successfully.');

        mongoose.connection.on('error', (error) => {
            logger.error("DB Connection error: ", error);
        })
    } catch (error) {
        logger.log('error', 'Cold not connect to DB: ', error.toString());
    };
};



module.exports = connectDatabase;