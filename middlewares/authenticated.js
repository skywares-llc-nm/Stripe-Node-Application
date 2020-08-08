// Restricts Unauthenticated Users
module.exports = (req, res, next) => { // express middleware function
    if (req.session.current_user) { // checks if the session has current_user object
        next() // proceeds to the requested url if session has current_user
    } else {
        res.redirect('/') // redirects to homepage if session doesn't have session
    }
}