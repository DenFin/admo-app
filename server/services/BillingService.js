const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");


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
        const billing = await Billing.findById(_id).lean()
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

    async createBilling(_billing) {
        const billing = new Billing({
            nr: _billing.nr,
            client: _billing.client,
            title: _billing.title,
            date: _billing.date,
            dateRangeStart: _billing.dateRangeStart,
            dateRangeEnd: _billing.dateRangeEnd,
            status: _billing.status,
            items: _billing.items,
            billingTotal: _billing.billingTotal,
            billingTaxes: _billing.billingTaxes,
            billingTotalWithTaxes: _billing.billingTotalWithTaxes
        })
        try {
            await billing.save()
            return billing
        } catch (error) {
            return error
        }
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

    async createPDF(_billing) {

        // launch a new chrome instance
        const browser = await puppeteer.launch({
            headless: true
        })

        // create a new page
        const page = await browser.newPage()
        const data = _billing;
        data.items = JSON.parse(data.items)
        data.date = this.formatDate(data.date)




        // set your html as the pages content
        const templateHtml = fs.readFileSync(`${__dirname}/pdf-template.html`, 'utf8')
        const template = handlebars.compile(templateHtml);
        const html = template(data);
        const pdfPath = `${__dirname}/my-fance-invoice-4.pdf`


        const options = {
            width: '1230px',
            headerTemplate: "<p></p>",
            footerTemplate: "<p></p>",
            displayHeaderFooter: false,
            margin: {
                top: "10px",
                bottom: "30px"
            },
            printBackground: true,
            path: pdfPath
        }


        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })

        // await page.emulateMedia('screen');

        // create a pdf buffer
        const pdfBuffer = await page.pdf({
            format: 'A4'
        })

        // or a .pdf file
        await page.pdf({
            format: 'A4',
            path: `${__dirname}/${data.nr}.pdf`,
            printBackground: true
        })

        // close the browser
        await browser.close()

    }



    formatDate(_date) {
        let date = new Date(_date)
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        month = date.toLocaleString('default', { month: 'long' });
        return `${day}. ${month} ${year}`;
    }

}

module.exports = BillingService