const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Only customer can place order
const OrderSchema = new Schema({
    product_id: mongoose.Schema.Types.ObjectId, // Stores id of the ordered product
    customer_id: mongoose.Schema.Types.ObjectId // Stores id of the user (with "customer" role)
})

module.exports = mongoose.model('Order', OrderSchema) // Creates Order Model from Schema and exports it