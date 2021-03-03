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

exports.getBillingsDue = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const billings = await BillingServiceInstance.getBillingsDue({}, page, limit)
        return res.status(200).json({ status: 200, data: billings, message: "Succesfully billings Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getBillingsCount = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const billings = await BillingServiceInstance.getBillingsCount({}, page, limit)
        return res.status(200).json({ status: 200, data: billings, message: "Succesfully billings Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getBillingById = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    const id = req.params.id;
    BillingServiceInstance.createPDF();
    try {
        const billing = await BillingServiceInstance.getBillingById(id)
        return res.status(200).json({ status: 200, data: billing, message: "Succesfully billings Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createBillingPdf = function() {
    BillingServiceInstance.createPDF();
    return res.status(200).json({ status: 201 })
}