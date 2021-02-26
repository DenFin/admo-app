<script>
import axios from "axios"
export default {
    data() {
        return {
            searchTerm: '',
            contacts: [],
            nextBirthdays: [],
            popupActive: false,
            deleteItem: null
        }
    },
    methods: {
        change() {
            return this.contacts.filter(contact => {
                return contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        },
        closeModal() {
            this.popupActive = false;
        },
        openModal(id) {
            this.deleteItem = id;
            this.popupActive = true;
        },
        async deleteTodo() {

            const id = this.deleteItem
            const url = `http://localhost:8000/api/contacts/${id}`

            try {
                await axios.delete(url)
                const url2 = 'http://localhost:8000/api/contacts'

                this.contacts = await new Promise(async(resolve, reject) => {
                    try {
                        const res = await axios.get(url2);
                        const data = res.data;
                        JSON.stringify(data)
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                })
                this.deleteItem = null;

            } catch (error) {
                console.log(error)
            }
        },
    },
    computed: {
        filteredList: function() {
            cache: false,
            console.log("AM FILTERING")
            if (this.contacts) {
                return this.contacts.filter(contact => {
                    return contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) 
                }) || this.contacts 
            }
        }
    }
} 
</script>