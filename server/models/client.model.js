const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
})



clientSchema.statics.getAllClients = async function getAllClients() {
    return Client.find()
}

clientSchema.methods.createClient = async function createClient() {
    this.save()
}

// module.exports = mongoose.model('Client', clientSchema);
const Client = mongoose.model('Client', clientSchema);
module.exports = Client