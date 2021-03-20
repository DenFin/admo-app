const express = require('express')
const router = express.Router()
const ContactCategory = require('../models/contactCategory.model')
const ContactCategoryController = require('../controllers/contactCategory.controller')



router.get('/', ContactCategoryController.getContactCategories)

router.post('/', ContactCategoryController.createContactCategory)

router.post('/', async(req, res) => {
    const contactCategory = new ContactCategory({
        name: req.body.name,
    })
    try {
        const newCategory = await contactCategory.save()
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(400).json(error.message)
    }
})



module.exports = router