// Restricts unauthenticated users and users without "customer" role
module.exports = (req, res, next) => { // express middleware function
    if (req.session.current_user && req.session.current_user.role == 'customer') { // checks if session have current_user and current_user have "customer" role
        next() // proceeds to requested url
    } else {
        res.redirect('/') // redirects back to homepage
    }
}