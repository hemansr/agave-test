const env = require('../config/env');
const passport = require('passport')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error: ' + err
                })
            }

            if (!user) {
                console.log(err)
                return res.status(200).json({
                    ok: false,
                    message: 'Incorrect username or password.'
                })
            }

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err)

                const body = { id: user.id, username: user.username }

                const token = jwt.sign({ user: body }, env.JWT_SECRET)
                return res.json({
                    ok: true,
                    token,
                    message: 'Login successfull'
                })
            })
        }
        catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error: ' + err
            })
        }
    })(req, res, next)
}

module.exports = {
    login
};
