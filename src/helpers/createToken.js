const jwt = require('jsonwebtoken');

const createToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SEED,
      {
        expiresIn: '72h',
      },
      (err, token) => {
        if (err) {
          reject(console.log(err));
        } else {
          resolve(token);
        }
      }
    );
  });
};

const tokenVerify = async (token) => {
  try {
    const { uid } = await jwt.verify(token, process.env.SEED);
    return [true, uid];
  } catch (error) {
    console.error(error);
    return [false, null];
  }
};

module.exports = { createToken, tokenVerify };
