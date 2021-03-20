const mongoose = require('mongoose')

const contactCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('ContactCategory', contactCategorySchema, 'contactCategories');