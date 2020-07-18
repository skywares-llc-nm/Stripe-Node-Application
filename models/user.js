const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = {
    name: String,
    email: String,
    account_type: String
}
