<template>
  <section>
      <div>
         <select class="form-control " name="" id="">
            <option :value="null" disabled hidden>Bitte wähle eine Kategorie aus</option>
            <option v-bind:key="category.name" v-for="category in contactCategories" v-bind:value="category.name">{{ category.name }}</option>
        </select>
      </div>
  </section>
</template>

<script>
import * as ContactCategoryService from "./../../../services/contacts/ContactCategoryService"
export default {
    name: 'contactCategoriesList',
    data(){
        return {
            contactCategories: null,
        }
    },
    async fetch() {
        this.contactCategories = await ContactCategoryService.fetchContactCategories()
    }
}
</script>

<style>

</style>