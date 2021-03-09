<template>
  <section>
      <div class="jumbotro pt-4">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 d-flex align-items-center justify-content-between">
                    <h3>{{ headline }}  <small class="text-muted">23</small> </h3><nuxt-link to="contacts/create" class="btn btn-sm btn-primary mb-3">Add contact</nuxt-link>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'Jumbotron',
    props: ['headline']
}
</script>

<style lang="sass" scoped>
.jumbotron
    padding: 2rem 0
    margin-bottom: 0
</style>