const router = require('express').Router() // express router
const Product = require('../models/product') // Product Model
const { body, validationResult } = require('express-validator') // express validator
const authenticatedUser = require('../middlewares/authenticated') // middleware to validate the current_user
const authenticatedSeller = require('../middlewares/authenticated_seller') // middleware to validate current_user has role of "seller" 


router.get('/add', // get request
 authenticatedSeller, // validates the seller role
 (req, res) => {
    res.render('add_product') // renders "add_product", 
})

router.post('/add', // post request
authenticatedSeller, //validates the seller role
[
    body('title').notEmpty(), // validates the title to not be empty
    body('price').notEmpty(), // validates the price to not be empty
    body('description').notEmpty(), // validates the description to not be empty
], async (req, res) => {
    const errors = validationResult(req) // errors from express validator
    if (!errors.isEmpty()) { // if errors
        return res.render('add_product', { errors: errors.errors }) // renders "add_product" with errors
    }

    await Product({ // creates product
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        owner_id: req.session.current_user._id
    }).save() //saves it to database

    res.redirect('/') // redirects to homepage
})

router.get('/mine', // get request
authenticatedSeller, //validates the seller role
async (req, res) => {
    const products = await Product.find({
        owner_id: req.session.current_user._id
    }) // gets all products by the logged in "seller"

    res.render('products', {products}) // renders "products" view with products
})

router.get('/all', // get request
authenticatedUser, //validates the Current_user
async (req, res) => {
    const products = await Product.find() // gets all the products

    res.render('products', {products}) // renders "products" view with product data
})

module.exports = router // exports the router