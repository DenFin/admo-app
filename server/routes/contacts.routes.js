const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.model')

router.get('/', async(req, res) => {
    try {
        const contacts = await Contact.find()
        const nextBirthdays = getNextBirthdays(contacts)
        const recentBirthdays = getRecentBirthdays(contacts)

        res.json({ contacts, nextBirthdays, recentBirthdays })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
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
        // console.log(bday)
    let daysTillBirthday = getDaysTillBirthday(bday)
    console.log(daysTillBirthday)

    // res.send({
    //     daysTillBirthay: daysTillBirthday
    // })

    res.send({
        firstname: res.contact.firstname,
        lastname: res.contact.lastname,
        dob: res.contact.dob,
        street: res.contact.street,
        zip: res.contact.zip,
        city: res.contact.city
    })
})

router.post('/', async(req, res) => {
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city
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

function getNextBirthdays(contacts) {
    let nextBirthdays = [];
    contacts.forEach(contact => {

        let daysTillBirthday = getDaysTillBirthday(contact.dob)
        let age = calculateAge(contact.dob)

        if (daysTillBirthday < 30 && daysTillBirthday > 0) {
            console.log(`${contact.firstname}'s birthday is in ${daysTillBirthday} days`)
            nextBirthdays.push({
                firstname: contact.firstname,
                days: daysTillBirthday,
                age: age
            })
        }
    })

    // Returns object with next birthdays
    return nextBirthdays
}

function getRecentBirthdays(contacts) {
    let recentBirthdays = [];
    contacts.forEach(contact => {

        let daysTillBirthday = getDaysTillBirthday(contact.dob)
        let age = calculateAge(contact.dob)

        if (daysTillBirthday < 0 && daysTillBirthday > -30) {
            console.log(`${contact.firstname}'s birthday was ${-daysTillBirthday} days ago`)
            recentBirthdays.push({
                firstname: contact.firstname,
                days: daysTillBirthday,
                age: age
            })
        }
    })

    // Returns object with next birthdays
    return recentBirthdays
}

function calculateAge(_birthday) {
    const now = new Date();
    const year = now.getFullYear();
    const birthdayYear = _birthday.getFullYear();
    return year - birthdayYear;
}

function getDaysTillBirthday(_birthday) {
    const birthday = birthdayDayOfYear(_birthday);
    const today = dayOfTheYear();
    return birthday - today;
}

function birthdayDayOfYear(date) {
    const now = date;
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function dayOfTheYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

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