const env = require('../config/env');
const passport = require('passport')
const bcrypt = require('bcryptjs');

const localStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const { cashiers } = require('../config/database');

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    try {

        const user = await cashiers.findOne({
            where: { username },
            attributes: ['id', 'username','password']
        });
        if (!user) return done(null, null, { message: 'Invalid user' })

        const validPassword = await bcrypt.compare(password, user.password)
            .catch(() => { return false; })

        if (!validPassword) return done(null, null, { message: 'Invalid password' })

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