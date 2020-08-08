const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Only Seller can have earnings...
const EarningsSechema = new Schema({
    order_id: mongoose.Schema.Types.ObjectId, // id of the order (placed on seller's product)
    seller_id: mongoose.Schema.Types.ObjectId, // id of the user (who owns the product)
    amount: Number, // Amount he got (after paying 10% + 3% tax fee)
    withdrawn: Boolean // makes sure, whether the seller has withdrawn the amount
})

module.exports = mongoose.model('Earnings', EarningsSechema) // Creates Earning Model from Schema