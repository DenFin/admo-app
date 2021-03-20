const ContactCategoryService = require("../services/ContactCategoryService");
const ContactCategoryServiceInstance = new ContactCategoryService();

exports.getContactCategories = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const contactCategories = await ContactCategoryServiceInstance.getContactCategories({}, page, limit)


        return res.status(200).json({ status: 200, data: { contactCategories }, message: "Succesfully ContactCategories Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


// exports.createContactCategory = async function(req, res) {

//     const contactCategory = new ContactCategoryServiceInstance({
//         name: req.body.name,
//     })
//     try {
//         const newCategory = await contactCategory.save()
//         res.status(201).json(newCategory)
//     } catch (error) {
//         res.status(400).json(error.message)
//     }


// }

exports.createContactCategory = async function(req, res) {
    console.log("IN CONTROLLER")
    try {
        await ContactCategoryServiceInstance.createContactCategory(req, res)
            // return res.json({ status: 201 });
    } catch (e) {
        // return res.json({ status: 500, message: e.message });
    }
}