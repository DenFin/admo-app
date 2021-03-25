const express = require('express')
const router = express.Router()
const BillingController = require('../controllers/billing.controller')
const RevenueController = require('../controllers/revenue.controller')

router.get('/', BillingController.getBillings)

router.get('/due', BillingController.getBillingsDue)

router.get('/count', BillingController.getBillingsCount)

router.get('/:id', BillingController.getBillingById)

router.get('/create', BillingController.createBillingPdf)

router.post('/', BillingController.createBilling, BillingController.addBillingToRevenues)

router.patch('/:id', BillingController.updateBilling, RevenueController.recalculateRevenues)

router.delete('/:id', BillingController.deleteBilling)

module.exports = router