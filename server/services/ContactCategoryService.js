const ContactCategory = require('../models/contactCategory.model')

class ContactCategoryService {

    constructor(_name) {
        this.name = _name;
    }


    async getContactCategories() {
        const contactCategories = await ContactCategory.find();
        return contactCategories;
    }

    async createContactCategory(req, res) {
        console.log("IN SERVICE")
        console.log(req.body)
        const contactCategory = new ContactCategory({
            name: req.body.name,
        })
        try {
            await contactCategory.save()
        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = ContactCategoryService