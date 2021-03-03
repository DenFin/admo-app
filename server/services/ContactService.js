const Contact = require('../models/contact.model')

class ContactService {

    constructor(nr, title, date, items, status) {
        this.nr = nr;
        this.title = title;
        this.date = date;
        this.items = items;
        this.status = status;
    }

}

module.exports = ContactService