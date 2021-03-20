<template>
    <div id="content" class="pt-5">
        <main>
            <pageHeadline headline="Rechnungen"></pageHeadline>
            <billingsList></billingsList>
        </main>
    </div>
</template>

<script>

import pageHeadline from "./../../components/global/pageHeadline"
import billingsList from "./../../components/billings/billingsList"

export default {
    components: {
        pageHeadline,
        billingsList
    }
}
</script>

<style>

</style>