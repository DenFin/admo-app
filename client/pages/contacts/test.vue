<template>
    <div id="content" class="pt-5">
        <main class="page-wrapper">
            <section id="top" class="panel">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="d-flex align-items-center justify-content-between">
                                <pageHeadline headline="Dies ist die Headline"></pageHeadline>
                                <createNewItemButton path="contacts/create" title="Neuen Kontakt hinzufügen"></createNewItemButton>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <contactsSubmenu></contactsSubmenu>
                        </div>
                    </div>
                </div>
            </section>
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
    name: 'test',
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

<style>

</style>