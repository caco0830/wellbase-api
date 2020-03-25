const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
    getUserWithUserName(db, username){
        return db('users')
            .where({username})
            .first();
    },
    comparePasswords(password, hash){
        return bcrypt.compare(password, hash);
    },
    createJwt(subject, payload){
        return jwt.sign(payload, condig.JWT_SECRET, {
            subject,
            algorith: 'HS256',
        });
    },
    verifyJwt(token){
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        });
    },
    parseBasicToken(token){
        return Buffer
            .from(token)
            .toString()
            .split(':');
    }
}

module.exports = AuthService;