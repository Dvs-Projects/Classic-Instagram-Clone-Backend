const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const dataErrorValidator = require('../middlewares/dataErrorValidator');
const validateJwt = require('../middlewares/validateJwt');

const {
  register,
  login,
  reNewToken,
} = require('../controllers/authController');

router.post(
  '/register',
  [
    check('realName', 'realName is required').not().isEmpty(),
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    dataErrorValidator,
  ],
  register
);

router.post(
  '/login',
  [
    check('userName', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    dataErrorValidator,
  ],
  login
);

router.get('/renew', validateJwt, reNewToken);

module.exports = router;
