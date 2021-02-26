<template>
<div>
  <section>
      <div class="jumbotron">
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                      <h1>Contacts</h1>
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row mb-4">
              <div class="col-sm-12">
                  <h3>Next birthdays</h3>
                  <div v-bind:key="birthday.firstname" v-for="birthday in nextBirthdays"> 
                      {{ birthday.firstname }} hat in {{ birthday.days }} Tagen Geburtstag und wird {{ birthday.age }} Jahre alt.
                  </div>
              </div>
          </div>
          <div class="row mb-4">
              <div class="col-sm-12">
                  <h3>Recent birthdays</h3>
                  <div v-bind:key="birthday.firstname" v-for="birthday in recentBirthdays"> 
                      {{ birthday.firstname }} hatte ivor {{ -birthday.days }} Tagen Geburtstag und ist {{ birthday.age }} Jahre alt geworden.
                  </div>
              </div>
          </div>
      </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                
                 <div class="form-group">
                    <input placeholder="Search a contact by name" v-model="searchTerm" v-on:input="change" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12 col-md-6 d-flex align-items-end">
                <nuxt-link to="contacts/create" class="btn btn-primary mb-3">Add contact</nuxt-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div>
                    <table class="table table-dark table-bordered">
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
                                <!-- <td><span :data-id="contact._id" @click="popupActive = true" class="i i--delete"></span></td> -->
                                <td><span :data-id="contact._id" @click="openModal(contact._id)" class="i i--delete"></span></td>
                            </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    
  </section>
    <!-- Modal -->
    <div v-bind:class="{active: popupActive} " class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
</div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            searchTerm: '',
            contacts: [],
            nextBirthdays: [],
            recentBirthdays: [],
            popupActive: false,
            deleteItem: null
        }
    },
    methods: {
        change(){
            console.log("CCCHCHCHCH")
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
                    const data = res.data.contacts;
                    this.contacts = data;
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            })
        },
        async formatDate(){
            let c = await this.contacts
            console.log(c)
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
            console.log(sortedDates)
            console.log("SORTED THEM")


            const now = new Date();
            let closest = Infinity;

            // this.contacts.forEach(contact => {
            //     console.log(contact.dob)
            //     const date = new Date(contact.dob);
            //     console.log(date)

            //     if (date >= now && (date < new Date(closest) || date < closest)) {
            //         closest = d;
            //         console.log(closest)
            //         console.log("IF")
            //     }
                
            // })
        }
    },
    async created(){
       
        const url = 'http://localhost:8000/api/contacts'
        
        this.contacts = this.fetchContacts();
        this.formatDate();

        this.nextBirthdays = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data.nextBirthdays;
                console.log(data)
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                // this.error = true
                // this.errorMessage = error
                reject(error);
            }
        })

        this.recentBirthdays = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data.recentBirthdays;
                console.log(data)
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
.i
    cursor: pointer
    width: 15px
    height: 15px
    background: red
    border-radius: 15px
    display: inline-block


.active
    opacity: 1 !important
    display: block
</style>