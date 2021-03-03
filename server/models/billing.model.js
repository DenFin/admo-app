const mongoose = require('mongoose')

const billingSchema = new mongoose.Schema({
    nr: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    dateRangeStart: {
        type: Date,
    },
    dateRangeEnd: {
        type: Date,
    },
    status: {
        type: String,
    },
    items: {
        type: String,
    },
    billingTotal: {
        type: String,
    },
    billingTaxes: {
        type: String,
    },
    billingTotalWithTaxes: {
        type: String,
    },
})

class Billing {

    getBillingNr() {
        return `${this.nr}`
    }

}

module.exports = mongoose.model('Billing', billingSchema);