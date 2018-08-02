const express = require('express')
const bodyParser = require('body-parser')
//express-session is the only package we need to bring in 
const session = require('express-session')
const lc = require('./controllers/loginController')
const sc = require('./controllers/secretsController')
//I broke out our checkLoggedIn function to a different file to keep our index.js file clean
const checkLoggedIn = require('./middleware/checkLoggedIn')

const app = express()

app.use(bodyParser.json())
//In order for our app to use sessions, we need to use it as app level middleware. 
//resave - determines whether our session should save back to the store if no changes were made on a request 
//saveUninitialized - determines whether a new session should be saved for a user if that user did not add anything to req.session
//secret - should be broken out into a .env file. This handles authenticating the incoming cookie
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'some secret'
}))

//login and logout
app.post('/api/login', lc.login)
app.delete('/api/logout', lc.logout)

//secrets routes
app.get('/api/secrets', checkLoggedIn, sc.getSecrets)

app.listen(3005, () => {
    console.log(`Listening on port 3005`)
})