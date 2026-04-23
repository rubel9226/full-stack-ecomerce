const data = require("../data");
const Product = require("../models/product.model");
const User = require("../models/user.model")

const seedUser = async (req, res, next) => {
    try {
        // deleting all existing users
        await User.deleteMany({});

         // inserting new users
         const users = await User.insertMany(data.users);

         // successful response
         return res.status(201).json(users);

    } catch (error) {
        next(error)
    }
}



const seedProducts = async (req, res, next) => {
    try {
        // deleting all existing users
        await Product.deleteMany({});

         // inserting new users
         const products = await Product.insertMany(data.products);

         // successful response
         return res.status(201).json(products);

    } catch (error) {
        next(error)
    }
}

module.exports = { seedUser, seedProducts };