const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.model')
const ContactController = require('../controllers/contact.controller')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    console.log(file.mimetype)
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    cb(null, true)
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const upload = multer({
    storage: storage
})




router.get('/', ContactController.getContacts)

// router.post('/avatar/upload', ContactController.uploadAvatar)

router.post('/avatar/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ file: req.file })
})





























router.get('/amount', getContactCount, async(req, res) => {
    // console.log("COUNT ROUTE")
    res.json(res.contactCount)
})

router.get('/birthdays', async(req, res) => {
    try {
        const contacts = await Contact.find()

        checkContacts(contacts)

        res.json(contacts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getContact, (req, res) => {

    let bday = res.contact.dob
        // let daysTillBirthday = this.getDaysTillBirthday(bday)

    res.send({
        firstname: res.contact.firstname,
        lastname: res.contact.lastname,
        dob: res.contact.dob,
        street: res.contact.street,
        zip: res.contact.zip,
        city: res.contact.city,
        avatar: res.contact.avatar
    })
})

router.post('/', async(req, res) => {
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        avatar: req.body.avatar
    })
    try {
        const newcontact = await contact.save()
        res.status(201).json(newcontact)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.patch('/:id', getContact, async(req, res) => {
    if (req.body.firstname != null) {
        res.contact.firstname = req.body.firstname
    }
    if (req.body.lastname != null) {
        res.contact.lastname = req.body.lastname
    }
    if (req.body.dob) {
        res.contact.dob = req.body.dob
    }
    if (req.body.street) {
        res.contact.street = req.body.street
    }
    if (req.body.zip) {
        res.contact.zip = req.body.zip
    }
    if (req.body.city) {
        res.contact.city = req.body.city
    }
    try {
        const updatedcontact = await res.contact.save()
        res.json(updatedcontact)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/:id', async(req, res) => {
    // console.log("Hello from delete a contact")
    try {
        const removedPost = await Contact.deleteOne({ _id: req.params.id })
        res.json(removedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




async function getContact(req, res, next) {
    let contact;
    try {
        contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find contact' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.contact = contact;
    next();
}

async function getContactCount(req, res, next) {
    // console.log("IN COUNT MIDDLEWARE")
    let contactCount;
    try {
        contactCount = await Contact.countDocuments({}, function(err, count) {
            // console.log("IN TRY")
            return count
        });
        if (contactCount == null) {
            return res.status(404).json({ message: 'Cannot find contact count' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.contactCount = contactCount;
    next();
}


module.exports = router