const express = require('express')
const router = express.Router()
const Client = require('../models/client')

router.get('/', async(req, res) => {
    try {
        const clients = await Client.find()
        res.json(clients)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getClient, (req, res) => {

    res.send({
        name: res.client.name,
        street: res.client.street,
        zip: res.client.zip,
        city: res.client.city
    })
})

router.post('/', async(req, res) => {
    console.log("CREATE CLIENT")
    const client = new Client({
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city
    })
    try {
        const newClient = await client.save()
        res.status(201).json(newClient)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.patch('/:id', getClient, async(req, res) => {
    if (req.body != null) {
        res.client.name = req.body.name
    }
    if (req.body.street) {
        res.client.street = req.body.street
    }
    if (req.body.zip) {
        res.client.zip = req.body.zip
    }
    if (req.body.city) {
        res.client.city = req.body.city
    }
    try {
        const updatedClient = await res.client.save()
        res.json(updatedClient)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/:id', getClient, async(req, res) => {
    try {
        await res.client.remove()
        res.json({ message: 'Deleted client' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


async function getClient(req, res, next) {
    let client;
    try {
        client = await Client.findById(req.params.id);
        if (client == null) {
            return res.status(404).json({ message: 'Cannot find client' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.client = client;
    next();
}


module.exports = router