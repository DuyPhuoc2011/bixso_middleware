const express = require('express');
const router = express.Router();
const mongoController = require('../controllers/mongoController');

router.get('/test', mongoController.testMongoConnection);
router.get('/articles', mongoController.getArticles);

module.exports = router;
