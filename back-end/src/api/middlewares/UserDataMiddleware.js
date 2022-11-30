const CustomHttpError = require("./CustomHttpError");

const userCheck = (req, _res, next) => {
  const { email, password } = req.body;
  
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passArr = password.split('');
  
  if (!email.match(emailRegex) || passArr.length < 6) {
    throw new CustomHttpError(400, 'WRONG EMAIL OR PASSWORD');
  };
  next();
}

module.exports = userCheck;