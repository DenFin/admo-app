<template>
    <div>
        <nuxt-link class="btn btn-info" :to="path">{{title}}</nuxt-link>
    </div>
</template>

<script>
export default {
    name: "createNewItemButton",
    props: ['path', 'title']
}
</script>

<style>

</style>