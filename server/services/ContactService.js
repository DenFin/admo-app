const Contact = require('../models/contact.model')

class ContactService {

    constructor(_firstname, _lastname, _dob, _street, _zip, _city) {
        this.firstname = _firstname;
        this.lastname = _lastname;
        this.dob = _dob;
        this.street = _street;
        this.zip = _zip;
        this.city = _city;
    }


    async getAllContacts() {
        const contacts = await Contact.find();
        return contacts;
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