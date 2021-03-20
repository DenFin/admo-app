<template>
    <div id="content" class="pt-5">
        <main>
            <div class="container d-flex align-items-center justify-content-between">
                <pageHeadline headline="Kunden"></pageHeadline>
                <createNewItemButton path="clients/create" title="Neuen Kunden hinzufügen"></createNewItemButton>
            </div>
            <clientsList class="pt-3"></clientsList>
        </main>
    </div>
</template>

<script>
import axios from "axios"
import pageHeadline from "./../../components/global/pageHeadline"
import clientsList from "./../../components/clients/clientsList"


export default {
    components: {
        pageHeadline,
        clientsList
    },
    data(){
        return{
            searchTerm: '',
            clients: []
        }
    },
    methods: {
        change(){
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        }
    },
    async created(){
       
       const url = 'http://localhost:8000/api/clients'
        this.clients = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                // this.error = true
                // this.errorMessage = error
                reject(error);
            }
        })
    },
    computed: {
        filteredList: function() {
            console.log("AM FILTERING")
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        }
    }
}
</script>

<style>

</style>