require('dotenv').config() // processes .env variables as process.env.VAR_NAME

const Order = require('../models/order') // Order Model
const router = require('express').Router() // Express Router
const Product = require('../models/product') // Product Model
const stripe = require('stripe')(process.env.STRIPE_API) // initiates stripe object (with API KEY IN .env)
const Earnings = require('../models/earnings') // Earnings Model
const { body, validationResult } = require('express-validator') // Express Validator
const AutenticatedCustomer = require('../middlewares/authenticated_customer') // Authenticated Customer Middleware to allow only users with the "customer" role

router.get('/place/:pid', // get request to "/orders/place/{product_id_on_which_the_order_is_going_to_be_placed}"
AutenticatedCustomer, // Middleware to validate if current_user has "customer" role
async (req, res) => {
    try {
        let product = await Product.findById(req.params.pid) // Gets the product from database (with the id passed in url)
        if (product) {
            let theOrder = await new Order({ // places the order
                product_id: product._id, // product_id (on which the order is going to be placed)
                customer_id: req.session.current_user._id // id of the user with "customer" role (who is placing the order)
            }).save() // saves the order in database

            const paymentIntent = await stripe.paymentIntents.create({ // creates stripe payment intent (for customer to pay the product fee)
                amount: product.price * 100, // in cents
                currency: 'usd', // currency is in usd
                // Verify your integration in this guide by including this parameter
                metadata: {integration_check: 'accept_a_payment'}, // from documentation
            })

            return res.render('place_order', {client_secret: paymentIntent.client_secret, order_id: theOrder._id}) // renders "place_order" view with client_secret (returned by stripe payment intent) and order_id
        }
        res.send('The product was not found!') // returns this response if product was not found in database
    } catch (error) {
        res.send(error) // returns this response if any error occurs
    }
})

router.post('/place/:pid', // post request to "/orders/place/product_id"
AutenticatedCustomer, // Middleware to validate current_user and current_user has "customer" role
async (req, res) => {
    try {
        let product  = await Product.findById(req.params.pid) // get product from database
        if(product) {
            await new Earnings({ // creates earning
                order_id: req.body.order_id, // id of the order (placed in get request to same url)
                amount: product.price - ((product.price * 13) / 100), // detucted the fee, (10% application and 3% stripe fee)
                seller_id: product.owner_id, // id of the product owner
                withdrawn: false // by default, we don't withdraw the earning on creation. So it'll be false
            }).save() // save it to database
            res.send('Success!') // returns success response
        }
        res.send('Product was not found') // returns if product wasn't found
    } catch (error) {
        res.send(error) // returns if any error occurs
    }
})




module.exports = router // exports the router