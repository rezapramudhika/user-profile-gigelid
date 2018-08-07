const express = require('express');
const router = express.Router();
const { loginAuth } = require('../middlewares/auth')
const { findById, update, uploadImage } = require('../controllers/profile.controller');
const { sendUploadToGCS } = require('../middlewares/uploadGCS');
const multer = require('../middlewares/multer');

router.get('/', loginAuth, findById);
router.put('/update', loginAuth, update);
router.post('/upload-image', loginAuth, multer.single('image'), sendUploadToGCS, uploadImage);
module.exports = router;
