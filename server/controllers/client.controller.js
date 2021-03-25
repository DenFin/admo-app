const Client = require("../models/client.model")


exports.getAllClients = async function(req, res) {
    const clients = await Client.getAllClients()
    return res.json(clients)
}

exports.createClient = async function(req, res) {
    const client = new Client({
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city

    })
    client.createClient()
    return res.status(201).json({ "test": "test" })
}