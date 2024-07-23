const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRE = process.env.EXPIRE;

function jwtTokenGenarator(email, id) {
    return jwt.sign({ email, id }, JWT_SECRET, {
        expiresIn: EXPIRE,
    });
}

module.exports = { jwtTokenGenarator }