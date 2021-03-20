<template>
    <div id="content" class="pt-5">
        <main>
            <contactDetail></contactDetail>
            <alertSuccess success="false"></alertSuccess>
        </main>
    </div>
</template>

<script>

import contactDetail from "./../../components/contacts/contactDetail"
import alertSuccess from "./../../components/alerts/alertSuccess"

export default {
    components: {
        contactDetail,
        alertSuccess
    }
}
</script>

