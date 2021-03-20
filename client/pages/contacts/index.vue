<template>
    <div id="content" class="pt-5">
        <main>
            <alertSuccess success="false"></alertSuccess>
            <alertError error="false"></alertError>
            <div class="container d-flex align-items-center justify-content-between">
            <pageHeadline headline="Kontakte"></pageHeadline>
            <createNewItemButton path="contacts/create" title="Neuen Kontakt hinzufügen"></createNewItemButton>
            </div>
            <contactsSubmenu></contactsSubmenu>
            <contactsList></contactsList>
        </main>
    </div>
</template>

<script>
import pageHeadline from "./../../components/global/pageHeadline"
import createNewItemButton from "./../../components/global/createNewItemButton"
import contactsSubmenu from "./../../components/contacts/contactsSubmenu"
import contactsList from "./../../components/contacts/contactsList"
import alertSuccess from "./../../components/alerts/alertSuccess"
import alertError from "./../../components/alerts/alertError"

export default {
    components: {
        pageHeadline,
        createNewItemButton,
        contactsSubmenu,
        contactsList,
        alertSuccess,
        alertError
    }
}
</script>
