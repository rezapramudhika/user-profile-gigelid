const express = require('express');
const router = express.Router();
const { register, get, checkEmail, checkContact, login } = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', get);
router.get('/check-email', checkEmail);
router.get('/check-contact', checkContact);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
