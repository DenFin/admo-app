<template>
    <div id="content">
        <main>
            <Jumbotron headline="Kontakte"></Jumbotron>
            <contactsSubmenu></contactsSubmenu>
            <contactsList></contactsList>
        </main>
    </div>
</template>

<script>
import Jumbotron from "./../../components/Jumbotron"
import contactsSubmenu from "./../../components/contacts/contactsSubmenu"
import contactsList from "./../../components/contacts/contactsList"

export default {
    components: {
        Jumbotron, 
        contactsSubmenu,
        contactsList
    }
}
</script>
