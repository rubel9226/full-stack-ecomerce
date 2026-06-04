const express = require('express');
const orderRouter = express.Router();

// const runValidation = require('../validators');
const runValidation = require('./../validators');
// const { validateProduct } = require('../validators/product');
const { uploadProductImage } = require('../middlewares/upload');
const { 
    handleCreateOrder, 
    handleMyOrders, 
    handleGetOrder, 
    handleUpdateOrderStatus, 
    paymentSLCZ, 
    handlePaymentSuccessSSLCZ, 
    handlePaymentFailSSLCZ, 
    handleCashOnDelivery, 
    handleGetAllOrders, 
    handleDeleteOrder
} = require('../controllers/order.controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');


// post api/orders/payment-bkash on sslcommerz
orderRouter.post('/payment-sslcommerz', isLoggedIn, paymentSLCZ);

// post api/orders/payment-bkash/success/:tran_id
orderRouter.post('/payment-sslcommerz/success/:tranId', handlePaymentSuccessSSLCZ)
orderRouter.post('/payment-sslcommerz/fail/:tranId', handlePaymentFailSSLCZ)

// post
orderRouter.put('/payment-cash_on_delivery', isLoggedIn, handleCashOnDelivery);


// post api/orders
orderRouter.post( '/',  isLoggedIn, handleCreateOrder );

// get api/orders
orderRouter.get('/', isLoggedIn, isAdmin, handleGetAllOrders);

// get api/orders/my-orders  handleMyOrders
orderRouter.get('/my-orders', isLoggedIn, handleMyOrders);

// get api/orders/:id
orderRouter.get('/:orderId', isLoggedIn, handleGetOrder);

// get api/orders/status/:id
orderRouter.put('/update-status/:orderId', isLoggedIn, isAdmin, handleUpdateOrderStatus);

// delete api/orders/delete/:id
orderRouter.put(
    '/delete/:orderId', 
    isLoggedIn, 
    isAdmin, 
    handleDeleteOrder
);


module.exports = orderRouter;