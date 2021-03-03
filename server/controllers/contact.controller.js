const ContactService = require("../services/ContactService");
const ContactServiceInstance = new ContactService();

exports.getContacts = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const contacts = await ContactServiceInstance.getAllContacts({}, page, limit)
        return res.status(200).json({ status: 200, data: Contacts, message: "Succesfully Contacts Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}