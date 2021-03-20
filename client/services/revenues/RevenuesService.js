import axios from "axios";



export async function fetchRevenues() {
    console.log("FETCH REVENUES SERVICE")
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://localhost:8000/api/revenues`
            const res = await axios.get(url);
            const data = res.data.data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}