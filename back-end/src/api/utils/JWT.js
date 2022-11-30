require('dotenv/config');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const jwtConfig = {
    expiresIn: '7d', 
    algorithm: 'HS256',
};

const generateToken = async (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const userJWT = async (token) => {
    const decoded = jwt.decode(token, JWT_SECRET);
    return decoded;
}

module.exports = { generateToken, userJWT };