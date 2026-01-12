const express = require('express');
const router = express.Router();
const businessCommuteController = require('../controllers/businessCommute');

// Submit business commute form
router.post('/submit', businessCommuteController.submitBusinessCommuteForm);

module.exports = router;

