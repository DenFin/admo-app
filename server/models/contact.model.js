const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    street: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    category: {
        type: String,
    }
})

module.exports = mongoose.model('Contact', contactSchema);