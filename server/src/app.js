const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors'); 
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');


const { clientURL } = require('./secret');


const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, 
    message: 'Too many requests form this IP. please try again later',
});



app.use(helmet());

app.use(cors({
    origin: clientURL,
    credentials: true
}));

app.use(cookieParser());

app.use(rateLimiter);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true}));
app.use(express.json({ limit: '5mbn' }));




const { errorResponse } = require('./controllers/response.controller');


const userRouter = require('./routes/user.route');
app.use("/api/users", userRouter);

const categoryRouter = require('./routes/category.router');
app.use("/api/categories", categoryRouter);

const productRouter = require('./routes/product.router');
app.use("/api/products", productRouter);

const orderRouter = require('./routes/order.route');
app.use("/api/orders", orderRouter);

const shippingRouter = require('./routes/shipping.route');
app.use("/api/shipping", shippingRouter);

const authRouter = require('./routes/authRouter');
app.use("/api/auth", authRouter);

// const seedRouter = require('./routes/seed.router'); 
// app.use("/api/seed", seedRouter); 


const ImageRouter = require('./routes/images.route');
app.use("/api/images", ImageRouter); 




//  client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});


//  client error handling --> all the errors
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    })
});



module.exports = app;