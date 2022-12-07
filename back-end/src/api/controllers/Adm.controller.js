const { getUsers, deleteUser } = require('../services/Adm.service');

const getAllClients = async (_req, res) => {
  const users = await getUsers();
  return res.status(200).json(users);
};

const deleteUserController = async (req, res) => {
  const id = Number(req.params.id);
  const user = await deleteUser(id);
  return res.status(202).json(user);  
};

module.exports = { getAllClients, deleteUserController };