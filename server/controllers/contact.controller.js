const multer = require('multer')
const ContactService = require("../services/ContactService");
const ContactServiceInstance = new ContactService();



exports.getContacts = async function(req, res, next) {
    console.log('cat: ' + req.query.cat);
    const query = await req.query.cat
    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    if (!query) {
        try {
            const contacts = await ContactServiceInstance.getAllContacts({}, page, limit)
            const nextBirthdays = ContactServiceInstance.getNextBirthdays(contacts)
            const recentBirthdays = ContactServiceInstance.getRecentBirthdays(contacts)
            return res.status(200).json({ status: 200, data: { contacts, nextBirthdays, recentBirthdays }, message: "Succesfully retrieved contacts and birthdays" });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    } else {
        switch (query) {
            case "friends":
                const contacts = await ContactServiceInstance.getContactsByCategory("Freund")
                return res.status(200).json({ status: 200, data: { contacts }, message: "Succesfully retrieved contacts with category of friends" });
        }
    }
}

exports.getContactAmount = async function(req, res, next) {
    try {
        const contactCount = await ContactServiceInstance.getContactAmount(req, res)
        if (contactCount == null) {
            return res.status(404).json({ message: 'Cannot find contact count' })
        }
        return res.status(200).json({ status: 200, data: { contactCount }, message: "Succesfully retrieved amount of contacts" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getContactById = async function(req, res, next) {
    try {
        const contact = await ContactServiceInstance.getContactById(req, res)
        return res.status(200).json({ status: 200, data: { contact }, message: "Succesfully retrieved contact by ID" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createContact = async function(req, res) {
    try {
        await ContactServiceInstance.createContact(req, res)
        return res.json({ status: 201 });
    } catch (e) {
        return res.json({ status: 500, message: e.message });
    }
}

exports.updateContactById = async function(req, res) {
    try {
        await ContactServiceInstance.updateContactById(req, res)
        res.status(201).json({ status: 201 })
    } catch (error) {
        return res.json({ status: 500, message: error.message });
    }
}

exports.deleteContactById = async function(req, res) {
    try {
        await ContactServiceInstance.deleteContactById(req, res)
        res.status(200).json({ status: 200 })
    } catch (error) {
        return res.json({ status: 500, message: error.message });
    }
}

exports.uploadAvatar = async function(req, res, next) {
    try {

        res.json({
            file: req.file
        })
    } catch (error) {

    }
}