import axios from "axios";



export async function fetchContactCategories() {
    console.log("ContactCategoryService.js: fetchContactCategories()")
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://localhost:8000/api/contactcategories`
            const res = await axios.get(url);
            const data = res.data.data.contactCategories;
            console.log(data)
            this.contacts = data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}