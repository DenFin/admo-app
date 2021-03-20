<template>
  <div id="content" class="pt-5">
        <main>
            <div class="container d-flex align-items-center justify-content-between">
                <pageHeadline headline="Kategorien"></pageHeadline>
                <createNewItemButton path="categories/create" title="Neue Kategorie hinzufügen"></createNewItemButton>
            </div>
            <contactsSubmenu></contactsSubmenu>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-sm-12 col-lg-6">
                        <contactCategoriesList></contactCategoriesList>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import pageHeadline from "./../../../components/global/pageHeadline"
import contactCategoriesList from "./../../../components/contacts/categories/contactCategoriesList"
export default {
    components: {
        pageHeadline,
        contactCategoriesList
    }
}
</script>

<style>

</style>