<template>
    <div id="content" class="pt-5">
        <main>
            <div class="container d-flex align-items-center justify-content-between">
                <pageHeadline headline="Rechnungen"></pageHeadline>
                <createNewItemButton path="billings/create" title="Neuen Rechnung hinzufügen"></createNewItemButton>
            </div>
            <billingsList class="pt-3"></billingsList>
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