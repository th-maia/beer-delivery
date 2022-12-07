const { Op } = require('sequelize');
const { User } = require('../../database/models/index');
const CustomHttpError = require('../middlewares/CustomHttpError');

const getUsers = async () => {
  const users = await User.findAll({ where: {
    [Op.or]: [
      { role: 'customer' },
      { role: 'seller' },
    ],
  } });
  if (!users) throw new CustomHttpError(404, 'NO USERS FOUND');
  return users;
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  if (!user) throw new CustomHttpError(400, 'COULDNT DELETE USER');
  return 'USER DELETED';
};

module.exports = { getUsers, deleteUser };