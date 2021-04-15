const { Router } = require('express');
const validateJwt = require('../middlewares/validateJwt');
const { getMessages } = require('../controllers/messageController');
const router = Router();

router.get('/:from', validateJwt, getMessages);

module.exports = router;
