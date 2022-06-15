const env = require('../config/env');
const passport = require('passport')
const jwt = require('jsonwebtoken')

const passportLogin = async (req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error: ' + err
                })
            }

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err)

                // const body = { _id: user._id, email: user.email }
                const body = { _id: 123456, username: 'user' }

                const token = jwt.sign({ user: body }, env.JWT_SECRET)
                return res.json({ ok: true, token })
            })
        }
        catch (error) {
            return next(error)
        }
    })(req, res, next)
}

module.exports = {
    passportLogin
};
