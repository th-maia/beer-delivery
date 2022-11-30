const { getUser } = require('../services/Login.service');

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await getUser(email, password);
  return res.status(200).json(user);
} 

module.exports = { login };