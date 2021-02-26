<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="navbar">
                            <nuxt-link class="navbar-brand" to="/">ADMO</nuxt-link>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <nuxt-link class="nav-link" to="/contacts">Contacts</nuxt-link>
                                    </li>
                                    <li class="nav-item">
                                        <nuxt-link class="nav-link" to="/clients">Clients</nuxt-link>
                                    </li>
                                    <li class="nav-item">
                                        <nuxt-link class="nav-link" to="/proposals">Proposals</nuxt-link>
                                    </li>
                                    <li class="nav-item">
                                        <nuxt-link class="nav-link" to="/billings">Billings</nuxt-link>
                                    </li>
                                    <li class="nav-item">
                                        <nuxt-link class="nav-link" to="/settings">Settings</nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style>

</style>