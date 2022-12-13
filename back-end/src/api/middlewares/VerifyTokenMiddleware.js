const { User } = require('../../database/models/index');
const { userJWT } = require('../utils/JWT');
const CustomHttpError = require('./CustomHttpError');

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomHttpError(403, 'NO TOKEN FOUND');
  }
  
  const decoded = await userJWT(authorization);

  const user = User.findOne({ where: { email: decoded.email } });

  if (!user) {
    throw new CustomHttpError(403, 'USER NOT FOUND. INVALID TOKEN');
  }

  req.headers.id = decoded.id;
  console.log('-----------------passou do midware de token------------------------')
  next();
};

module.exports = checkToken;