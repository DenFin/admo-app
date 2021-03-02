function isDue() {

    const billing = this;
    const today = new Date();
    const paymentTarget = 14;

    if (!billing.status.isPaid() && billing.date + paymentTarget >= today) {
        return true;
    } else {
        return false;
    }

}

function getBillingsDue(_billings) {

    const billings = _billings
    const billingsDue = {
        billings = [],
        total = 0,
        taxes = 0,
        totalWithTaxes
    }

    billings.forEach(billing => {
        if (billing.isDue()) {
            billingsDue.billings.push(billing)
        }
    });

    return billings;

}

// localhost/api/billings/due
router.get('/due', async(req, res) => {
    try {

        const billings = await Billing.find()
        const billingsDue = getBillingsDue(billings)

        res.json(billingsDue)


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})