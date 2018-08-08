const express = require('express');
const router = express.Router();
const { register, checkEmail, checkContact, login } = require('../controllers/user.controller');

router.get('/check-email', checkEmail);
router.get('/check-contact', checkContact);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
