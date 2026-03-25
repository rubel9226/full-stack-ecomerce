const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');


// option 1
const connectDatabase = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options)
        console.log('Connection to DB is successfully.');

        mongoose.connection.on('error', (error) => {
            console.error("DB Connection error: ", error);
        })
    } catch (error) {
        console.error('Cold not connect to DB: ', error.toString());
    };
};



module.exports = connectDatabase;