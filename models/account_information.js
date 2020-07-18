const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountInfoSchema = {
    userId: mongoose.Schema.Types.ObjectId,
    stripeId: String
}

export default AccountInfo = mongoose.model('AccountInformation', accountInfoSchema)