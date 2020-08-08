const User = require('../models/user') // User Model
const router = require('express').Router() // Express Router
const { body, validationResult } = require('express-validator') // Express validator (to validate incoming form data)


router.get('/register', (req, res) => { // get request to "/auth/register" renders "register" view
    res.render('register')
})

router.post('/register', // post request to "/auth/register"
[ // express validator middleware
    body('name').notEmpty(), // validates name field (returns error response if name is empty)
    body('email').isEmail(), // validates email field (returns error response if email is not vaild)
    body('role').notEmpty(), // validates role field (returns error response if empty)
    body('password').notEmpty()// validates password field (returns error response if empty)
]
, async (req, res) => {
    const errors = validationResult(req) // Errors from express-validator middleware
    if (!errors.isEmpty()) { // if errors, renders "register" view with errors object
        return res.render('register', { errors: errors.errors }) // renders "register" view with errors object
    }

    // If there ain't any error, it runs the code below

    // Let's not hash the password
    const user = await User({ // creates user
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }).save() // saves the user to database

    req.session.current_user = user // stores the registered user in session (as current_user)
    req.session.save() // saves the session
    return res.redirect('/') // redirects to homepage

})

router.get('/login', (req, res) => { // get request to "/auth/login" renders "login" view
    res.render('login')
})

router.post('/login', // post request to "/auth/login"
[ // express validator middleware
    body('email').isEmail(), // validates email (returns error response if not valid)
    body('password').notEmpty() // validates password field (returns error response if empty)
], async (req, res) => {
    const errors = validationResult(req) // gets errors (if any) from request object
    
    if (!errors.isEmpty()) { // if errors
        
        return res.render('login', { errors: errors.errors }) // renders "login" view with errors object if there are errors
    }

    // I didn't hash the password 
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    }) // gets user from database (if any)

    req.session.current_user = user // stores user in session
    req.session.save() // saves the session
    return res.redirect('/') // redirects to homepage
})

router.get('/logout', (req, res) => { // get request to "/auth/logout"
    req.session.destroy() // destroys the session
    return res.redirect('/') // redirects to homepage
})

module.exports = router // exports the router