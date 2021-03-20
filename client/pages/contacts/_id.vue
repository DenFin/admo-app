<template>
    <div id="content" class="pt-5">
        <main>
            <pageHeadline v-if="contact" :headline="`${contact.firstname} ${contact.lastname}`"></pageHeadline>
            <contactDetail></contactDetail>
            <alertSucess success="true"></alertSucess>
        </main>
    </div>
</template>

<style lang="sass">
table
    table-layout: fixed
td
    position: relative
    input
        color: #fff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: transparent
        width: 100%
        border: none

</style>

<script>
import pageHeadline from "./../../components/global/pageHeadline"
import contactDetail from "./../../components/contacts/contactDetail"
import alertSuccess from "./../../components/alerts/alertSuccess"

export default {
    components: {
        pageHeadline,
        contactDetail,
        alertSuccess
    }
}
</script>

