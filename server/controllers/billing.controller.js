const BillingService = require("../services/BillingService");
const BillingServiceInstance = new BillingService();

exports.getBillings = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const billings = await BillingServiceInstance.getAllBillings({}, page, limit)
        return res.status(200).json({ status: 200, data: billings, message: "Succesfully billings Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}