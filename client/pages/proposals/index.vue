<template>
  <div id="content" class="pt-5">
      <main>
          <div class="container d-flex align-items-center justify-content-between">
                <pageHeadline headline="Angebote"></pageHeadline>
                <createNewItemButton path="proposals/create" title="Neues Angebot hinzufügen"></createNewItemButton>
            </div>
          <proposalsList class="pt-3"></proposalsList>
      </main>
  </div>
</template>

<script>
import pageHeadline from "./../../components/global/pageHeadline"
import proposalsList from "./../../components/proposals/proposalsList"

export default {
    components: {
        pageHeadline,
        proposalsList
    }
}
</script>

<style>

</style>