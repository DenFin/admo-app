const RevenueService = require("../services/RevenueService")
const RevenueServiceInstance = new RevenueService()
const Billing = require("./../models/billing.model")

exports.getRevenues = async function(req, res, next) {
    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;

    try {
        // const revenues = await RevenueServiceInstance.calculateAllExistingRevenues({}, page, limit)
        // const revenuesSaved = await RevenueServiceInstance.writeExistingRevenuesToDB({ revenues }, page, limit)
        // return res.status(200).json({ message: revenuesSaved })
        const revenues = await RevenueServiceInstance.getRevenues({}, page, limit)
        const data = revenues
        return res.status(200).json({ status: 200, data: { data }, message: "Succesfully revenues Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.recalculateRevenues = async function(req, res) {
    console.log("=== REVENUE CONTROLLER ===")
    try {
        let reqBody = req.body
        let date = new Date(reqBody.date)
        let month = date.toLocaleString('de-DE', { month: 'long' })
        console.log({ date, month })


        // GET ALL BILLINGS FROM MONTH OF CHANGED BILLING
        const billings = await Billing.find()
            .where(date.toLocaleString('de-DE', { month: 'long' }))
            .equals(month);
        console.log(billings)


        // CUMULATE THEIR BILLING TOTAL
        // CHECK IF MONTH EXISTS
        // GET MONTH REVENUE FROM DATABASE
        // SET CUMULATED VALUE TO MONTH REVENUE





    } catch (error) {
        console.log(error)
    }

}