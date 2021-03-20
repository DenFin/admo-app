<template>
    <div v-if="success == true" class="alert alert-success" role="alert">
        Änderungen gespeichert!
    </div>
</template>

<script>
export default {
    name: 'alertSuccess',
    props: ['success']
}
</script>
