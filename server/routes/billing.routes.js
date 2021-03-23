const express = require('express')
const router = express.Router()

const Billing = require('../models/billing.model')
const BillingController = require('../controllers/billing.controller')




router.get('/', BillingController.getBillings)

router.get('/due', BillingController.getBillingsDue)

router.get('/count', BillingController.getBillingsCount)

router.get('/:id', BillingController.getBillingById)

router.get('/create', BillingController.createBillingPdf)

router.post('/', BillingController.createBilling, BillingController.addBillingToRevenues)


router.patch('/:id', getBilling, async(req, res) => {
    if (req.body != null) {
        res.billing.name = req.body.name
    }
    if (req.body.street) {
        res.billing.street = req.body.street
    }
    if (req.body.zip) {
        res.billing.zip = req.body.zip
    }
    if (req.body.city) {
        res.billing.city = req.body.city
    }
    try {
        const updatedBilling = await res.billing.save()
        res.json(updatedBilling)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/:id', getBilling, async(req, res) => {
    try {
        await res.billing.remove()
        res.json({ message: 'Deleted billing' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/due', async(req, res) => {
    try {
        const billings = await Billing.find()
        res.json(billings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getBilling(req, res, next) {
    let billing;
    try {
        billing = await Billing.findById(req.params.id);
        if (billing == null) {
            return res.status(404).json({ message: 'Cannot find billing' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.billing = billing;
    next();
}


module.exports = router