<template>
  <nav class="navbar navbar-expand-lg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group btn-group-sm">
                            <nuxt-link to="/contacts" class="btn btn-sm btn-primary">Alle Kontakte</nuxt-link>
                            <nuxt-link to="/contacts/birthdays" class="btn btn-sm btn-primary">Geburtstage</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
</template>

<script>
export default {
    name: "contactsSubmenu"
}
</script>

<style lang="sass" scoped>
.btn-primary
    background: rgb(4, 34, 47) !important
    border-color: rgb(4, 34, 47) !important
.nuxt-link-exact-active
    background: #f8b572 !important
    border-color: #f8b572 !important

</style>