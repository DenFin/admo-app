import axios from "axios";


export async function fetchBillings() {
    return new Promise(async(resolve, reject) => {
        try {
            const url = 'http://localhost:8000/api/billings'
            const res = await axios.get(url);
            const data = res.data.data;
            JSON.stringify(data)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}