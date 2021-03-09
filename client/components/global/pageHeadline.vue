<template>
    <section class="section-page-headline">
        <div class="jumbotro pt-4">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 d-flex align-items-center justify-content-between">
                        <h3>{{ headline }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'pageHeadline',
    props: ['headline']
}
</script>

<style>

</style>