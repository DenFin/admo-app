<template>
  <div id="content">
        <main>
            <Jumbotron headline="Kontakte"></Jumbotron>
            <contactsSubmenu></contactsSubmenu>
            <contactsNextBirthdaysList></contactsNextBirthdaysList>
        </main>
    </div>
</template>

<script>
import contactsNextBirthdaysList from "./../../components/contacts/contactsBirthdays"
export default {
    components: {
        contactsNextBirthdaysList
    }
}
</script>

<style>

</style>