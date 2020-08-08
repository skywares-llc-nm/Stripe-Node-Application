const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const userSchema = new Schema({ // user schema
    name: String, // To store name of the user
    email: String, // To store email of the user
    password: String, // To store password of the user
    role: String, // it can be "customer" or "seller"
    stripe_account_id: String // if the user have "seller" role, we need this (stores stripe account_id of the user)
})

module.exports = mongoose.model('User', userSchema) // Creates model from schema and exports it