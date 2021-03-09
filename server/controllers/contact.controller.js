const ContactService = require("../services/ContactService");
const ContactServiceInstance = new ContactService();

exports.getContacts = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const contacts = await ContactServiceInstance.getAllContacts({}, page, limit)
        const nextBirthdays = ContactServiceInstance.getNextBirthdays(contacts)
        const recentBirthdays = ContactServiceInstance.getRecentBirthdays(contacts)

        return res.status(200).json({ status: 200, data: { contacts, nextBirthdays, recentBirthdays }, message: "Succesfully Contacts Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.uploadAvatar = async function(req, res, next) {
    try {
        await ContactServiceInstance.uploadAvatar()
        return res.status(200).json({ status: 200, data: { contacts, nextBirthdays, recentBirthdays }, message: "Succesfully Contacts Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}