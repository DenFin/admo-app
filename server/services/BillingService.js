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

    async updateBilling(_billing) {
        try {
            const query = { _id: _billing._id };
            const updatedBilling = {
                $set: {
                    nr: _billing.nr,
                    client: _billing.client,
                    title: _billing.title,
                    date: _billing.date,
                    dateRangeStart: _billing.dateRangeStart,
                    dateRangeEnd: _billing.dateRangeEnd,
                    status: _billing.status,
                    items: JSON.stringify(_billing.items),
                    billingTotal: _billing.billingTotal,
                    billingTaxes: _billing.billingTaxes,
                    billingTotalWithTaxes: _billing.billingTotalWithTaxes
                }
            }
            const options = { "upsert": true };
            Billing.updateOne(query, updatedBilling, options).then(result => {
                    const { matchedCount, modifiedCount } = result;
                    if (matchedCount && modifiedCount) {
                        console.log(`Successfully edited billing.`)
                    }
                })
                .catch(err => console.error(`Failed edit billing: ${err}`))


        } catch (error) {
            console.log(error)
        }
    }

    async deleteBilling(_id) {
        console.log(_id)
        const deletedBilling = await Billing.deleteOne({ _id: _id })
        return deletedBilling
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
        const year = data.date.getFullYear()
        const month = data.date.getMonth() + 1
        data.items = JSON.parse(data.items)
        data.date = this.formatDate(data.date)
        data.dateRangeStart = this.formatDate(data.dateRangeStart)
        data.dateRangeEnd = this.formatDate(data.dateRangeEnd)
            // set your html as the pages content
        const templateHtml = fs.readFileSync(`${__dirname}/../templates/invoice-pdf-template.html`, 'utf8')
        const template = handlebars.compile(templateHtml);
        const html = template(data);
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
        }

        this.createFolderStructure(year, month)

        await page.setContent(html, {
                waitUntil: 'domcontentloaded'
            })
            // await page.emulateMedia('screen');
        await page.focus('body');
        const session = await page.target().createCDPSession();
        await session.send('DOM.enable');
        await session.send('CSS.enable');
        session.on('CSS.fontsUpdated', event => {
            console.log(event);
            // event will be received when browser updates fonts on the page due to webfont loading.
        });
        // create a pdf buffer
        const pdfBuffer = await page.pdf({
            format: 'A4'
        })

        // or a .pdf file
        await page.pdf({
            format: 'A4',
            path: `${__dirname}/../files/invoices/${year}/${month}/${data.nr}.pdf`,
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
        console.log({ date, month })
        return `${day}. ${month} ${year}`;
    }

    createFolderStructure(_year, _month) {
        const baseDir = 'files/invoices/'
        const currentYearDir = `${baseDir}${_year}`
        const currentMonthDir = `${baseDir}${_year}/${_month}`
        if (!fs.existsSync(currentYearDir)) {
            console.log(currentYearDir + " does not exist")
            fs.mkdirSync(currentYearDir, {
                recursive: true
            });
            if (!fs.existsSync(currentMonthDir)) {
                fs.mkdirSync(currentMonthDir, {
                    recursive: true
                });
            }
        } else {
            console.log(currentYearDir + " does exist")
            if (!fs.existsSync(currentMonthDir)) {
                fs.mkdirSync(currentMonthDir, {
                    recursive: true
                });
            }
        }
    }

}

module.exports = BillingService