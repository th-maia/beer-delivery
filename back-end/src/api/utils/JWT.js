require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const getSecretEvaluation = async () => 
  fs.readFile('jwt.evaluation.key', { encoding: 'utf-8' });

const jwtConfig = {
    expiresIn: '24d', 
    algorithm: 'HS256',
};

const generateToken = async (payload) => {
  const secret = await getSecretEvaluation();
  return jwt.sign(payload, secret, jwtConfig);
};

const userJWT = async (token) => {
    const secret = await getSecretEvaluation();
    const decoded = jwt.decode(token, secret);
    return decoded;
};

module.exports = { generateToken, userJWT };