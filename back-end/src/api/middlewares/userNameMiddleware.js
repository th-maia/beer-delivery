const CustomHttpError = require('./CustomHttpError');

const nameCheck = (req, _res, next) => {
  const { name } = req.body;
  const nameArr = name.split('');
  
  if (nameArr.length < 12) {
    throw new CustomHttpError(400, 'INCORRET NAME');
  }
  next();
};

module.exports = nameCheck;