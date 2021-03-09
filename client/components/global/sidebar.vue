<template>
  <aside>
      <strong>MogliApp</strong>
      <nav class="">
          <ul class="nav flex-column">
              <li class="nav-item">
                  <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to="/contacts">Kontakte</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to="/clients">Kunden</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to="/billings">Rechnungen</nuxt-link>
              </li>
          </ul>
      </nav>
  </aside>
</template>

<script>
export default {
    name: "Sidebar"
}
</script>

<style lang="sass" scoped>
strong
    font-family: 'Chewy', cursive
    font-size: 2rem
    padding: 1.5rem 
    display: block

a
    color: #fff
    padding: 1rem 1.5rem
    &:hover
        color: #f8b572
a.active
    background: #04222f

</style>