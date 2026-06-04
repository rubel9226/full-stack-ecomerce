const express = require('express');
const shippingRouter = express.Router();


const { isLoggedIn } = require('../middlewares/auth');
const { handleCreateShipping, handleGetShipping, handleGetShippingActive, handleUpdateShippingActive, handleUpdateStatus, handleDeleteShipping,  } = require('../controllers/shipping.controller');

// post /api/shipping
shippingRouter.post( '/',  isLoggedIn, handleCreateShipping);

// get api/shipping
shippingRouter.get('/', isLoggedIn, handleGetShipping);

// get api/shipping/default/:userId
shippingRouter.get('/default', isLoggedIn, handleGetShippingActive);

// put api/shipping/status/:id
shippingRouter.put('/status/:id', isLoggedIn, handleUpdateStatus);

// put api/shipping
shippingRouter.put('/:userId', isLoggedIn, handleUpdateShippingActive);

// put api/shipping
shippingRouter.delete('/:id', isLoggedIn, handleDeleteShipping);

module.exports = shippingRouter;