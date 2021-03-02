const Billing = require('../models/billing')

class BillingService {

    constructor(nr, title, date, items, status) {
        this.nr = nr;
        this.title = title;
        this.date = date;
        this.items = items;
        this.status = status;
    }

    async getAllBillings() {
        const billings = await Billing.find()
            // console.log(billings)
        const b = []
        billings.forEach(billing => {

            // console.log(billings)
            if (billing.client == "KÖNIGSPUNKT GmbH") {
                b.push(billing)
            }

        })
        console.log(b)
        return b;
        // console.log(billings)
    }


    isDue() {
        const billing = this;
        const today = new Date();

        // TODO: Get Zahlungsziel Value from DB Settings Collection
        const zahlungsziel = 14
            // const zahlungsziel = billing.date + settings.zahlungsziel

        // When status not paid AND date bigger + zahlungsziel bigger than today
        if (!billing.status.isPaid() && billing.date + zahlungsZiel >= today) {
            return true
        }
    }


}

module.exports = BillingService