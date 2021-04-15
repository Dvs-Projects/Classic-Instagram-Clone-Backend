const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createToken } = require('../helpers/createToken');

const register = async (req, res = response) => {
  try {
    const { userName, password } = req.body;

    const allReadyEmail = await User.findOne({ userName });

    if (allReadyEmail)
      return res
        .status(400)
        .json({ ok: false, msg: 'userName all ready exist' });

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await createToken(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Can't register the user...",
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userDb = await User.findOne({ userName });
    if (!userDb)
      return res.status(404).json({
        ok: false,
        msg: 'User not exist',
      });

    const validPassword = bcrypt.compareSync(password, userDb.password);

    if (!validPassword)
      return res.status(404).json({
        ok: false,
        msg: 'User or Pasword wrong',
      });

    const token = await createToken(userDb.id);

    res.json({
      ok: true,
      msg: 'Logged!',
      userDb,
      token,
    });
  } catch (err) {
    console.error(err);
  }
};

const reNewToken = async (req, res) => {
  try {
    const uid = req.uid;
    const token = await createToken(uid);
    const user = await User.findById(uid);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  register,
  login,
  reNewToken,
};
