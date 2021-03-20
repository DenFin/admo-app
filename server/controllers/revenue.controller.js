const RevenueService = require("../services/RevenueService")
const RevenueServiceInstance = new RevenueService()

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