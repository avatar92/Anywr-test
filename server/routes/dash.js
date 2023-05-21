const express = require('express');

const dashController = require('../controllers/dash');

const router = express.Router();

router.get('/info',dashController.info)

module.exports = router;