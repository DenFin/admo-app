<template>
  <div id="content" class="pt-5">
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <pageHeadline headline="Geburtstage"></pageHeadline>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <contactsSubmenu></contactsSubmenu>
                    </div>
                </div>
            </div>
            <contactsNextBirthdaysList></contactsNextBirthdaysList>
        </main>
    </div>
</template>

<script>
import pageHeadline from "./../../components/global/pageHeadline"
import contactsNextBirthdaysList from "./../../components/contacts/contactsBirthdays"
export default {
    components: {
        pageHeadline,
        contactsNextBirthdaysList
    }
}
</script>

<style>

</style>