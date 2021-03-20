const express = require('express')
const router = express.Router()
const RevenueController = require('../controllers/revenue.controller')

router.get('/', RevenueController.getRevenues)

module.exports = router