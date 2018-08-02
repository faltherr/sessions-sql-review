module.exports = (req, res, next) => {
    //If req.session.loggedIn was set to true in the login endpoint, then we will return next() here meaning carry on in the route chain. Either to the next middleware function or the final function that handles the response 
    if(req.session.loggedIn) return next()
    //if req.session.loggedIn is false, we do not let the request proceed to the next step in the route chain and instead end the request sending back a 403 status code.
    res.status(403).send('Must login first')
}