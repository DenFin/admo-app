const Contact = require('../models/contact.model')
const multer = require('multer')

class ContactService {


    constructor(_firstname, _lastname, _dob, _street, _zip, _city, _avatar, _category) {
        this.firstname = _firstname;
        this.lastname = _lastname;
        this.dob = _dob;
        this.street = _street;
        this.zip = _zip;
        this.city = _city;
        this.avatar = _avatar;
        this.category = _category;
    }



    async getAllContacts() {
        const contacts = await Contact.find()
        return contacts;
    }

    async getContactsByCategory(_cat) {
        const contacts = await Contact.find({ category: _cat });
        return contacts;
    }

    async getContactAmount(req, res) {
        console.log("IN SERVICE")
        let contactCount;

        try {
            console.log("IN TRY")
            contactCount = await Contact.countDocuments({}, function(err, count) {
                return count
            });

        } catch (error) {
            console.log({ message: error.message })
        }

        return contactCount
    }

    async getContactById(req, res) {
        let contact;
        try {
            contact = await Contact.findById(req.params.id);
            if (contact == null) {
                return res.status(404).json({ message: 'Cannot find contact' })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
        return contact;
    }

    async createContact(req, res) {
        const contact = new Contact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            avatar: JSON.stringify(req.body.avatar),
            category: req.body.category
        })
        try {
            await contact.save()
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateContactById(req, res) {
        let contact;
        let updatedContact
        try {
            const query = { _id: req.params.id };
            const updatedContact = {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    dob: req.body.dob,
                    street: req.body.street,
                    zip: req.body.zip,
                    city: req.body.city,
                    avatar: req.body.avatar,
                    category: req.body.category
                }
            }

            const options = { "upsert": true };
            Contact.updateOne(query, updatedContact, options).then(result => {
                    const { matchedCount, modifiedCount } = result;
                    if (matchedCount && modifiedCount) {
                        console.log(`Successfully added a new review.`)
                    }
                })
                .catch(err => console.error(`Failed to add review: ${err}`))


        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async deleteContactById(req, res) {
        try {
            const removedPost = await Contact.deleteOne({ _id: req.params.id })
            res.json(removedPost)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async uploadAvatar(req, res) {
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

        try {
            upload.single('file')
        } catch (error) {

        }
    }




    getNextBirthdays(contacts) {
        let nextBirthdays = [];
        contacts.forEach(contact => {

            let daysTillBirthday = this.getDaysTillBirthday(contact.dob)
            let age = this.calculateAge(contact.dob)

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

    getRecentBirthdays(contacts) {
        let recentBirthdays = [];
        contacts.forEach(contact => {

            let daysTillBirthday = this.getDaysTillBirthday(contact.dob)
            let age = this.calculateAge(contact.dob)

            if (daysTillBirthday < 0 && daysTillBirthday > -30) {
                // console.log(`${contact.firstname}'s birthday was ${-daysTillBirthday} days ago`)
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

    calculateAge(_birthday) {
        const now = new Date();
        const year = now.getFullYear();
        const birthdayYear = _birthday.getFullYear();
        return year - birthdayYear;
    }

    getDaysTillBirthday(_birthday) {
        const birthday = this.birthdayDayOfYear(_birthday);
        const today = this.dayOfTheYear();
        return birthday - today - 1;
    }

    birthdayDayOfYear(date) {
        const now = date;
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    dayOfTheYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    uploadAvatar() {
        return 'TEST'
    }


}

module.exports = ContactService