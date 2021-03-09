import axios from "axios";



export async function fetchClients() {
    console.log("Clientservice.js: fetchClients() in contactList.vue")
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://localhost:8000/api/clients`
            const res = await axios.get(url);
            const data = res.data
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}