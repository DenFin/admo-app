<template>
    <div id="content" class="pt-5">
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <pageHeadline headline="Freunde"></pageHeadline>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <contactsSubmenu></contactsSubmenu>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <contactsList></contactsList>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import * as ContactService from "./../../services/contacts/ContactService"
import pageHeadline from "./../../components/global/pageHeadline"
import contactsSubmenu from "./../../components/contacts/contactsSubmenu"
import contactsList from "./../../components/contacts/contactsList"


export default {
    components: {
        pageHeadline,
        contactsSubmenu,
        contactsList
    },
    data(){
        return {
            friends: null
        }
    },
    async created() {
        const route = this.$route.fullPath
        const category = route.replace("/contacts/", "")
        console.log(category)
        this.friends = await ContactService.fetchContactsByCategory(category)

    }
}
</script>
