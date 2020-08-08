// Restricts unauthenticated users and user don't have role "customer"
module.exports = (req, res, next) => { // express middleware function
    if (req.session.current_user && req.session.current_user.role == 'seller') { // checks if session has current_user object, and if the current_user has "seller" role
        next() // proceeds to requested url if session have current_user and current_user have "seller" role
    } else {
        res.redirect('/') // redirects to homepage if session doesn't have current_user or current_user doesn't have "seller" role
    }
}