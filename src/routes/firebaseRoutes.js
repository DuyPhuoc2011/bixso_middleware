const express = require('express');
const router = express.Router();
const firebaseController = require('../controllers/firebaseController');

router.get('/test', firebaseController.checkConnection);
router.get('/articles', firebaseController.getArticles);

module.exports = router;
