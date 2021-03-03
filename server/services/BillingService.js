const puppeteer = require('puppeteer')
const fs = require('fs')


const Billing = require('../models/billing.model')



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
        return billings
    }

    async getBillingById(_id) {
        const billing = await Billing.findById(_id)
        return billing
    }

    async getBillingsDue() {
        const billings = await Billing.find()
        const billingsDue = []

        billings.forEach(billing => {
            if (billing.status === "paid") {
                billingsDue.push(billing)
            }
        })

        return billingsDue
    }

    async getBillingsCount() {
        const billingsCount = await Billing.find().count()
        return billingsCount
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


    async createPDF() {

        // launch a new chrome instance
        const browser = await puppeteer.launch({
            headless: true
        })

        // create a new page
        const page = await browser.newPage()

        // set your html as the pages content
        const html = fs.readFileSync(`${__dirname}/../templates/billing-template.html`, 'utf8')
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })

        // create a pdf buffer
        const pdfBuffer = await page.pdf({
            format: 'A4'
        })

        // or a .pdf file
        await page.pdf({
            format: 'A4',
            path: `${__dirname}/my-fance-invoice.pdf`
        })

        // close the browser
        await browser.close()

    }

}

module.exports = BillingService