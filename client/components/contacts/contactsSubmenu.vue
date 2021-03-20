<template>
    <nav class="navbar navbar-expand-lg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group btn-group-sm">
                            <div class="dropdown show">
                                <nuxt-link to="/contacts" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Alle Kontakte</nuxt-link>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    
                                    <nuxt-link to="/contacts/friends" class="dropdown-item">Freunde</nuxt-link>
                                    <nuxt-link to="/contacts/family" class="dropdown-item">Familie</nuxt-link>
                                    <nuxt-link to="/contacts/clients" class="dropdown-item">Kunden</nuxt-link>
                                </div>
                            </div>
                            
                            <nuxt-link to="/contacts/birthdays" class="btn btn-sm btn-primary d-flex align-items-center">Geburtstage</nuxt-link>
                            <nuxt-link to="/contacts/categories" class="btn btn-sm btn-primary d-flex align-items-center">Kategorien</nuxt-link>
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
.btn-primary, .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle
    background: rgb(4, 34, 47) 
    border-color: rgb(4, 34, 47)

.nuxt-link-exact-active
    background: #f8b572 !important
    border-color: #f8b572 !important

</style>