const express = require('express');
const router = express.Router();
const pgController = require('../controllers/pgController');

router.get('/test', pgController.testPgConnection);

module.exports = router;
