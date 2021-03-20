<template>
    <div class="container mt-4">
        <div class="row mb-4" v-if="nextBirthdays.length > 0">
            <contactBirthdayCard  :birthday="birthday" v-bind:key="birthday.firstname" v-for="birthday in nextBirthdays"></contactBirthdayCard>
        </div>
        <div v-else>
            Keine Geburtstage in den nächsten 14 Tagen.
        </div>
    </div>
</template>

<script>
import * as ContactService from "./../../services/contacts/ContactService"
import contactBirthdayCard from "./../../components/contacts/birthdays/contactBirthdayCard"

export default {
    name: 'contactsNextBirthdaysList',
    components: {
        contactBirthdayCard
    },
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
