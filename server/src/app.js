const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const createError = require('http-errors'); 
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');


const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, 
    message: 'Too many requests form this IP. please try again later',
});



app.use(cookieParser());
app.use(rateLimiter);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());




const { errorResponse } = require('./controllers/response.controller');


const userRouter = require('./routes/user.route');
app.use("/api/users", userRouter);

const categoryRouter = require('./routes/category.router');
app.use("/api/categories", categoryRouter);

const authRouter = require('./routes/authRouter');
app.use("/api/auth", authRouter);

const seedRouter = require('./routes/seed.router');
app.use("/api/seed", seedRouter);



//  client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});


//  client error handling --> all the errors
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
});



module.exports = app;