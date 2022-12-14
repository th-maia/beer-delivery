const registerService = require('../services/Register.service');

const register = async (req, res) => {
  const user = await registerService.postUser(req.body);
  return res.status(201).json(user);
};

module.exports = { register };