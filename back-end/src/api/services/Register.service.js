const md5 = require('md5');
const { User } = require('../../database/models/index');
const { generateToken } = require('../utils/JWT');
const CustomHttpError = require('../middlewares/CustomHttpError');

const postUser = async ({ name, email, password, role }) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new CustomHttpError(409, 'EMAIL ALREADY EXIST');
  }

  const hash = md5(password);

  const result = await User.create({ name, email, password: hash, role });
  if (!result) {
    throw new CustomHttpError(500, 'COULD NOT REGISTER USER');
  }

  const token = await generateToken({ email: result.email, name: result.name, role: result.role });

  return {
    name: result.name,
    email: result.email,
    role: result.role,
    token,
  };
};

module.exports = { postUser };