const User = require('../models/User');

const userConnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();

  return user;
};

const userDisconnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();

  return user;
};

const getUsersConnected = async () => {
  const users = await User.find({}).sort('-online');
  return users;
};

module.exports = {
  userConnected,
  userDisconnected,
  getUsersConnected,
};
