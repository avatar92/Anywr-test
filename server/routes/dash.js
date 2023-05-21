const express = require('express');

const dashController = require('../controllers/dash');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.get('/info',isAuthenticated,dashController.info)

module.exports = router;