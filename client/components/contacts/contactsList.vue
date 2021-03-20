<template>
    <section class="contactsList">
        <div class="container">
            <div v-if="contacts" class="row pt-3">
                <div class="col-sm-12">
                    <div>
                        <table class="table table-dark table-bordered table-sm table-condensed">
                            <thead>
                                <th>Vorname</th>
                                <th>Nachname</th>
                                <th>DOB</th>
                                <th>Street</th>
                                <th>ZIP</th>
                                <th>City</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr v-bind:key="contact.name" v-for="contact in contacts">
                                    
                                    <td><nuxt-link :to="`/contacts/${contact._id}`">{{ contact.firstname }}</nuxt-link></td>
                                    <td>{{ contact.lastname }}</td>
                                    <td>{{ contact.dob }}</td>
                                    <td>{{ contact.street }}</td>
                                    <td>{{ contact.zip }}</td>
                                    <td>{{ contact.city }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <nuxt-link class="dropdown-item" :to="`/contacts/${contact._id}`">Kontakt bearbeiten</nuxt-link>
                                                <a class="dropdown-item" href="#"><span :data-id="contact._id" @click="openModal(contact._id)" class="i i--delet">Kontakt löschen</span></a>
                                            </div>
                                            </div>
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-sm-12">
                    <p>Keine Kontakt vorhanden.</p>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div v-bind:class="{active: popupActive} " class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Element löschen</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span @click="closeModal" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Bist du sicher, dass du dieses Element unwiderruflich löschen möchtest?
                </div>
                <div class="modal-footer">
                    <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                    <button @click="deleteContact(2)" type="button" class="btn btn-danger">Löschen</button>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios"
import * as ContactService from "./../../services/contacts/ContactService"

export default {
    name: 'contactsList',
    data(){
        return{
            searchTerm: '',
            contacts: null,
            nextBirthdays: [],
            recentBirthdays: [],
            popupActive: false,
            deleteItem: null,
            error: false,
            errorMessage: ''
        }
    },
     methods: {
        change(){
            return this.contacts.filter(contact => {
                return contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        },
        closeModal(){
            this.popupActive = false;
        },
        openModal(id){
            this.deleteItem = id;
            this.popupActive = true;
        },
        async deleteContact(){
            const id = this.deleteItem
            const url = `http://localhost:8000/api/contacts/${id}`
            try {
                await axios.delete(url)
                this.fetchContacts()
                this.popupActive = false;
            } catch (error) {
                // TODO: handle error
                console.error(error)
            }
        },
        async fetchContacts () {
            return new Promise(async(resolve, reject) => {
                try {
                    const url = 'http://localhost:8000/api/contacts'
                    const res = await axios.get(url);
                    const data = res.data.data.contacts;
                    this.contacts = data;
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            })
        },
        async formatDate(){
            let c = await this.contacts
            await this.contacts.forEach(contact =>{
                let date = new Date(contact.dob)
                let day = date.getDate();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month = date.toLocaleString('default', { month: 'long' });
                contact.dob = `${day}. ${month} ${year}`
            })  
        },
        compareDates(){
           
            const dates = []
            this.contacts.forEach(contact => {
                dates.push(new Date(contact.dob))
            })
            console.log(dates)

            const datesTime = []
            dates.forEach(date => {
                console.log(date)
                console.log(date.getTime())
            })
            

            function sortDates(dates) {
                return dates.map(function(date) {
                    return date.getTime();
                }).sort(function(a, b) {
                    return a - b;
                });
            }

            let sortedDates = sortDates(dates);
            sortedDates = sortedDates.map(date => {
                return new Date(date)
            })

            const now = new Date();
            let closest = Infinity;

            
        }
    },
    async fetch(){
        this.contacts = await ContactService.fetchContacts()
        this.formatDate();
    },
    computed: {
        filteredList: function() {
            cache: false,
            console.log("AM FILTERING")
            if(this.contacts){
                return this.contacts.filter(contact => {
                    return contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())
                })
            }
        }
    }
}
</script>

<style lang="sass">
a
    color: #f8b572
.table-dark
    background:#04222f
.table-dark td, .table-dark th, .table-dark thead th
    border-color: #063144

.active
    opacity: 1 !important
    display: block
</style>