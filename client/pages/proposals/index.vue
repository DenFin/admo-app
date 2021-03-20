<template>
  <div id="content" class="pt-5">
      <main>
          <pageHeadline headline="Angebote"></pageHeadline>
          <proposalsList></proposalsList>
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