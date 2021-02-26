router.get('/', async(req, res) => {

    try {
        const contacts = await Contact.find()

        // Returns promise, but want object
        const nextBirthdays = getNextBirthdays(contacts)

        var promise = Promise.resolve(nextBirthdays);

        promise.then(function(val) {
            console.log(val);
        });

        res.json({ contacts, nextBirthdays })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getNextBirthdays(contacts) {

    contacts.forEach(async(contact) => {

        let daysTillBirthday = await getDaysTillBirthday(contact.dob)

        if (daysTillBirthday < 10 && daysTillBirthday > 0) {
            console.log(`${contact.firstname}'s birthday is in ${daysTillBirthday} days`)
            nextBirthdays.push({
                firstname: contact.firstname,
                days: daysTillBirthday
            })
        }

        // Returns object with next birthdays
        return nextBirthdays

    })
}

async function getDaysTillBirthday(_birthday) {
    const birthday = await birthdayDayOfYear(_birthday)
    const today = await dayOfTheYear()
    const days = birthday - today
    return await days;
}

async function birthdayDayOfYear(date) {
    const now = date;
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return await day
}

async function dayOfTheYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return await day
}