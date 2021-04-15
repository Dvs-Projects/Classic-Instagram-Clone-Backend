const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token)
      return res.status(401).json({ ok: false, msg: 'No veo el token' });

    const { uid } = jwt.verify(token, process.env.SEED);
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token invalid',
      error,
    });
  }
};

module.exports = validateJwt;
