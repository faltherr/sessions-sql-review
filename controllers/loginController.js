let siteUsername = 'Zach'
let sitePassword = 'my password'

module.exports = {
    login: (req, res) => {
        let {username, password} = req.body
        if(siteUsername === username && password === sitePassword) {
            req.session.loggedIn = true;
            res.status(200).send('Logged in')
        }
        else {
            req.session.loggedIn = false
            res.status(403).send('Username and password did not match')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send('Logged out')
    }
}