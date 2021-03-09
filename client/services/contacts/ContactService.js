import axios from "axios";



export async function fetchContacts() {
    console.log("ContactService.js: fetchContacts() in contactList.vue")
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://localhost:8000/api/contacts`
            const res = await axios.get(url);
            const data = res.data.data.contacts;
            console.log(data)
            this.contacts = data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

export async function fetchNextBirthdays() {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://localhost:8000/api/contacts`
            const res = await axios.get(url);
            const data = res.data.data.nextBirthdays;
            JSON.stringify(data)
            resolve(data);
        } catch (error) {
            // this.error = true
            // this.errorMessage = error
            reject(error);
        }
    })
}