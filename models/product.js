const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Only Seller can add products...
const ProductSchema = new Schema({ // product schema
    title: String, // To store title of the product
    price: Number, // To store price of the product
    owner_id: mongoose.Schema.Types.ObjectId, // ID of User with "seller" role
    description: String, // Stores description of the product
})

module.exports = mongoose.model('Product', ProductSchema) // creates Product Model and exports it