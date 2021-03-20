<template>
    <div v-if="error == true" class="alert alert-danger" role="alert">
        Fehler aufgetreten!
    </div>
</template>

<script>
export default {
    name: 'alertError',
    props: ['error']
}
</script>
