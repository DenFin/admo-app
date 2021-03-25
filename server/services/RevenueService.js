const { DateTime } = require('luxon');
const Revenue = require('../models/revenue.model')
const Billing = require('../models/billing.model')


class RevenueService {

    constructor() {

    }

    async getRevenues() {
        const revenues = await Revenue.find()
        return revenues
    }

    async addBillingToRevenues(_req, _res) {
        try {
            const reqBody = _req.body
            const billingMonth = new Date(_req.body.date).toLocaleString('en-GB', { month: 'long' });
            const billingTotal = parseFloat(_req.body.billingTotal)
            const revenue = await Revenue.findOne({ month: billingMonth });

            if (revenue) {
                const amount = parseFloat(revenue.amount)
                revenue.amount = amount + billingTotal
                revenue.save()
            } else {
                let revenueTemp = new Revenue({
                    month: billingMonth,
                    amount: billingTotal
                })

                const newRevenue = await revenueTemp.save()
                return newRevenue
            }


        } catch (error) {
            console.log(error)
        }
    }

    async calculateAllExistingRevenues() {

        // get all billings
        const billings = await Billing.find()
        const revenues = []
        let billingMonth

        // loop over billing
        for (let i = 0; i < billings.length; i++) {
            // console.log({ revenues })
            billingMonth = new Date(billings[i].date).toLocaleString("en-GB", { month: "long" });
            if (i === 0) {
                revenues.push({ month: billingMonth, total: parseFloat(billings[i].billingTotal) })
            } else {
                if (revenues[revenues.length - 1].month === billingMonth) {
                    revenues[revenues.length - 1].total = parseFloat(revenues[revenues.length - 1].total) + parseFloat(billings[i].billingTotal)
                } else {
                    revenues.push({ month: billingMonth, total: parseFloat(billings[i].billingTotal) })
                }
            }
        }

        return revenues

    }

    async writeExistingRevenuesToDB(_revenues) {
        let revenues = _revenues.revenues
        revenues.forEach(async revenue => {
            let revenueTemp = new Revenue({
                month: revenue.month,
                amount: revenue.total
            })

            const newRevenue = await revenueTemp.save()
            return newRevenue
        })


    }
















    checkIfMonthExists(_revenues) {

        let bool;

        _revenues.forEach(revenue => {
            if (revenue.month == "March") {
                bool = true
            } else {
                bool = true
            }
        })
        return bool

    }



}

module.exports = RevenueService