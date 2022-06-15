const env = require('../config/env');
const passport = require('passport')

const localStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    try {
        // get user
        const user = {
            _id: 123456,
            username: 'user'
        }
        // validate password

        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
}))


passport.use(new JWTStrategy({
    secretOrKey: env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromHeader('app_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))