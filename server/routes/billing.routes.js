const express = require('express')
const router = express.Router()

const Billing = require('../models/billing.model')
const BillingController = require('../controllers/billing.controller')




router.get('/', BillingController.getBillings)

router.get('/due', BillingController.getBillingsDue)

router.get('/count', BillingController.getBillingsCount)

router.get('/:id', BillingController.getBillingById)

router.get('/create', BillingController.createBillingPdf)

// router.get('/:id', getBilling, (req, res) => {

//     const billing = new Billing({
//         nr: res.billing.nr,
//         client: res.billing.client,
//         title: res.billing.title,
//         date: res.billing.date,
//         dateRangeStart: res.billing.dateRangeStart,
//         dateRangeEnd: res.billing.dateRangeEnd,
//         status: res.billing.status,
//         items: res.billing.items,
//         billingTotal: res.billing.billingTotal,
//         billingTaxes: res.billing.billingTaxes,
//         billingTotalWithTaxes: res.billing.billingTotalWithTaxes
//     })
//     console.log(req.body.nr)
//     res.status(200).json(billing)
// })

router.post('/', async(req, res) => {
    console.log(req.body.nr)
    const billing = new Billing({
        nr: req.body.nr,
        client: req.body.client,
        title: req.body.title,
        date: req.body.date,
        dateRangeStart: req.body.dateRangeStart,
        dateRangeEnd: req.body.dateRangeEnd,
        status: req.body.status,
        items: req.body.items,
        billingTotal: req.body.billingTotal,
        billingTaxes: req.body.billingTaxes,
        billingTotalWithTaxes: req.body.billingTotalWithTaxes
    })
    try {
        const newBilling = await billing.save()
        res.status(201).json(newBilling)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

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