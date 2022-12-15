const admService = require('../services/Adm.service');

const getAllClients = async (_req, res) => {
  const users = await admService.getUsers();
  return res.status(200).json(users);
};

const deleteUserController = async (req, res) => {
  const id = Number(req.params.id);
  const user = await admService.deleteUser(id);
  return res.status(202).json(user);  
};

module.exports = { getAllClients, deleteUserController };