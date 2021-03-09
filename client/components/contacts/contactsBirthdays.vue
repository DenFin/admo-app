<template>
  <div class="container">
        <div class="row mb-4">
            <div class="col-sm-12">
                <h3>Next birthdays</h3>
                <div v-bind:key="birthday.firstname" v-for="birthday in nextBirthdays"> 
                    <h4>{{ birthday.firstname }} {{ birthday.lastname }}</h4>

                    {{ birthday.firstname }} hat in {{ birthday.days }} Tagen Geburtstag und wird {{ birthday.age }} Jahre alt.
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-sm-12">
                <h3>Recent birthdays</h3>
                <div v-bind:key="birthday.firstname" v-for="birthday in recentBirthdays"> 
                    {{ birthday.firstname }} hatte vor {{ -birthday.days }} Tagen Geburtstag und ist {{ birthday.age }} Jahre alt geworden.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as ContactService from "./../../services/contacts/ContactService"
export default {
    name: 'contactsNextBirthdaysList',
    data(){
        return{
            searchTerm: '',
            contacts: [],
            nextBirthdays: [],
            recentBirthdays: [],
            popupActive: false,
            deleteItem: null,
            error: false,
            errorMessage: ''
        }
    },
    async fetch(){
        this.nextBirthdays = await ContactService.fetchNextBirthdays();
    }
}
</script>
