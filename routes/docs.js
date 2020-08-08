const router = require('express').Router()


router.get('/', (req, res) => {
    res.redirect('/docs/models/user')
})

// Models
router.get('/models/user', (req, res) => {
    res.render('docs/user-model.pug')
})

router.get('/models/product', (req, res) => {
    res.render('docs/product-model.pug')
})

router.get('/models/order', (req, res) => {
    res.render('docs/order-model.pug')
})

router.get('/models/earnings', (req, res) => {
    res.render('docs/earnings-model.pug')
})

// Middlewares
router.get('/middlewares/authenticated', (req, res) => {
    res.render('docs/middlewares/authenticated.pug')
})

router.get('/middlewares/authenticated_customer', (req, res) => {
    res.render('docs/middlewares/authenticated_customer.pug')
})

router.get('/middlewares/authenticated_seller', (req, res) => {
    res.render('docs/middlewares/authenticated_seller.pug')
})

// Routes
router.get('/routes/auth', (req, res) => {
    res.render('docs/routes/auth.pug')
})

router.get('/routes/order', (req, res) => {
    res.render('docs/routes/order.pug')
})

router.get('/routes/payment', (req, res) => {
    res.render('docs/routes/payment.pug')
})

router.get('/routes/product', (req, res) => {
    res.render('docs/routes/product.pug')
})

module.exports = router